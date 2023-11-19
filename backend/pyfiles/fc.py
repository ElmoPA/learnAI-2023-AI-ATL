import sys
import json
topics_path = sys.argv[1]
with open('pyfiles/'+topics_path, 'r') as file:
    topics = json.load(file)


import time

# Numpy and Pandas
import numpy as np
import pandas as pd
import os
import zipfile

# Langchain
import langchain
from langchain.text_splitter import RecursiveCharacterTextSplitter, CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.document_loaders.text import TextLoader
from langchain.document_loaders import DataFrameLoader
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.retrievers.self_query.base import SelfQueryRetriever
from langchain.chains.query_constructor.base import AttributeInfo
from langchain.agents.agent_toolkits import create_retriever_tool
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import ResponseSchema
from langchain.output_parsers import StructuredOutputParser
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.output_parsers.list import ListOutputParser
from langchain.chains import SimpleSequentialChain
from langchain.chains import LLMChain
from langchain.agents import AgentType, initialize_agent, load_tools

# Vertex AI
from google.cloud import aiplatform
from langchain.llms import VertexAI
from langchain.embeddings import VertexAIEmbeddings

# print(f"LangChain version: {langchain.__version__}")
# print(f"Vertex AI SDK version: {aiplatform.__version__}")

persist_directory = 'embeddings/chroma/'
embedding = VertexAIEmbeddings()
llm = VertexAI(model_name="text-bison@001",
            max_output_tokens=1000,
            temperature=0.0,
            top_p=0.8,
            top_k=40,
            verbose=True)

from google.cloud import storage

def download_zip_from_gcs(bucket_name, source_blob_name, destination_file_path):
    """Downloads a zip file from Google Cloud Storage."""
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(source_blob_name)

    blob.download_to_filename(destination_file_path)
    # print(f"Downloaded {source_blob_name} to {destination_file_path}")

def extract_zip(zip_file_path, destination_dir):
    """Extracts a zip file to the specified destination directory."""
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(destination_dir)
    # print(f"Extracted {zip_file_path} to {destination_dir}")

download_zip_from_gcs('user-main-database', 'user-1/Subject/History/vectordb.zip', 'vectordb.zip')

extract_zip('vectordb.zip', '.')

def generate_vectordb(persist_directory, embedding):
    return Chroma(
        persist_directory=persist_directory,
        embedding_function=embedding,
    )

vectordb = generate_vectordb('lecture', embedding)

# print(vectordb._collection.count())

len(vectordb.get()['documents'])

from fuzzywuzzy import fuzz

def remove_similar_words(word_list, threshold=90):
    """
    Removes words from the list that are similar to each other based on the threshold.
    :param word_list: List of words.
    :param threshold: Similarity threshold.
    :return: List with similar words removed.
    """
    unique_words = []
    for word in word_list:
        if all(fuzz.ratio(word, other_word) < threshold for other_word in unique_words):
            unique_words.append(word)
    return unique_words

entities = topics

def write_to_json_files(self, front_list, back_list):
    for i, (front, back) in enumerate(zip(front_list, back_list)):
        json_object = {'front': front, 'back': back}
        filename = f"flashcard_{i}.json"

        with open(filename, 'w') as json_file:
            json.dump(json_object, json_file, indent=4)

        # print(f"Created {filename} --> {json_object}")
        
def export_flashcards_to_json(front_terms, back_terms, filename='flashcards.json'):
    flashcards = [{'front': front[0], 'back': back} for front, back in zip(front_terms, back_terms)]
    print(json.dumps(flashcards, file, indent=4))

class ListParser(ListOutputParser):
    def parse(self, text):
        return [item.strip() for item in text.split(',')]

class HistoryFlashcard:
    def __init__(self, llm, vectordb, entities, listParser):
        self.llm = llm
        self.vectordb = vectordb
        self.entities = entities
        self.listParser = listParser
        self.qa_chain = RetrievalQA.from_chain_type(
            self.llm,
            retriever=self.vectordb.as_retriever(),
            return_source_documents=False
        )
    
    def generate_people_keys(self):
        people_entities = self.entities['figures']
        prompt_template = PromptTemplate.from_template(
            """list: {list} \n
                The list may contain strings that are not names of people. 
                Eliminate the elements that are not names and keep the rest. 
                For elements that are full names, clean the names so that they have both first name and last name and are reable.
                Eliminate elements that only have either first name or last name.
                Remove names that are repetitive.
                
                Output as strings separated by a comma.
                
                Sample Input:
                ['3Albert Einstein', 'Table', "Marie Curie's", 'Dr. Jane Goodall[]', 'River', 'Armstrong', 'Book', 'Anne Frank1', "Marie.Curie"]
                
                Sample Output:
                'Albert Einstein', 'Marie Curie', 'Jane Goodall', 'Anne Frank'
                """)
        message = prompt_template.format(list=people_entities)
        response = self.llm(message)
        keys = self.listParser.parse(response)
        return [(name, "PERSON") for name in keys]

    def generate_event_keys(self, doc_splits):
        keys = []
        for split in doc_splits:
            prompt_template = PromptTemplate.from_template(
            """Document: {split} \n
                Extract the key historical events that have names mentioned in the document.
                Historical events are significant occurrences, incidents, or developments
                that have taken place in the past and have had a notable impact on societies, cultures, or the course of history.
                This include Wars and Battles, Revolutions, Political Movements, Scientific Discoveries, Cultural and Artistic Movements, 
                Natural Disasters, Exploration and Expeditions, Space Exploration, Inventions and Technological Advancements, 
                Treaties and Agreements, Epidemics and Pandemics, Social Movements, Religious Events.
                Historical events are NOT people, dates, nor locations.
                List these events and make sure to provide name of events only, separated by commas. Do not give a full sentence. I want a list.
                
                sample output:
                The Signing of the Magna Carta, The Discovery of the New World by Christopher Columbus, 
                The Invention of the Printing Press by Johannes Gutenberg, The French Revolution, The End of Apartheid in South Africa
                """)
            message = prompt_template.format(split=split)
            response = self.llm(message)
            new_keys = self.listParser.parse(response)
            keys += new_keys
        return [(event, "EVENT") for event in keys]

    def generate_flashcard_keys(self, doc_splits):
        people_keys = self.generate_people_keys()
        event_keys = self.generate_event_keys(doc_splits)
        combined_keys = remove_similar_words(people_keys + event_keys, 70)
        return combined_keys
    
    def find_flashcard_values(self, flashcard_keys):
        flashcard_values = []
        for term, tag in flashcard_keys:
            if tag == 'PERSON':
                result = self.qa_chain({"query": f"""Output one phrase, not a sentence, describing who {term} is and what is the person's importance.
                                                sample input: Ronald Reagan
                                                sample output: 40th U.S. President, Champion of Reaganomics and Key Player in Ending the Cold War"""})
                flashcard_values.append(result['result'])
            elif tag == 'EVENT':
                result = self.qa_chain({"query": f"""Output one phrase, not a sentence, describing when {term} was and what was the event's importance
                                                sample input: Siege of Jerusalem
                                                sample output: 1099 Key Battle, Christian Crusaders Capture Jerusalem, Major Turning Point in the First Crusade"""})
                flashcard_values.append(result['result'])
                # print('-------- ERROR TAG!!!!!! --------')

        return flashcard_values

    def generate_flashcards(self, doc_splits):
        flashcard_keys = self.generate_flashcard_keys(doc_splits)
        flashcard_backs = self.find_flashcard_values(flashcard_keys)
        return flashcard_keys, flashcard_backs

splits = vectordb.get()['documents']
entities = topics
listParser = ListParser()

start_time = time.time()
flashcard = HistoryFlashcard(llm=llm, vectordb=vectordb, entities=entities, listParser=listParser)
flashcard_fronts, flashcard_backs = flashcard.generate_flashcards(splits)

end_time = time.time()
execution_time = end_time - start_time
# print(f"Execution time: {execution_time} seconds")

export_flashcards_to_json(flashcard_fronts, flashcard_backs)