import sys
import json
topics_path = sys.argv[1]
with open(topics_path, 'r') as file:
    topics = json.load(file)


import time

# Numpy and Pandas
import numpy as np
import pandas as pd
import os

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
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import CSVLoader
from langchain.vectorstores import DocArrayInMemorySearch
from langchain.indexes import VectorstoreIndexCreator

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

# random thought: add meta to doc so that user can choose which files/chapters he wants 
# to create flashcard and AI only generate flashcards from those chapters

path = '../demo-file/lecture.txt'
file_name = os.path.basename(path).split('.')[0]
doc = TextLoader(path).load()[0]
# doc.metadata['chapter'] = 'chapter 1: overview of the civil war'
# doc.metadata['material'] = 'textbook'

def split_doc(doc):
    r_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1500,
        chunk_overlap=150, 
        separators=["\n\n", "\n"]
    )
    return r_splitter.split_documents([doc])

splits = split_doc(doc)

def generate_vectordb(doc_file_name, doc_splits, persist_directory, embedding):
    embeddings_folder_path = persist_directory + file_name + '/'
    if os.path.isdir(embeddings_folder_path):
        items = os.listdir(embeddings_folder_path)
        has_files = any(os.path.isfile(os.path.join(embeddings_folder_path, item)) for item in items)

        if has_files:
            # print("loaded old vectordb")
            return Chroma(
                persist_directory=embeddings_folder_path,
                embedding_function=embedding,
            )
        # else:
            # print("ERROR")
    else:
        # print("created new vectordb")
        return Chroma.from_documents(
            documents=splits,
            embedding=embedding,
            persist_directory=embeddings_folder_path
        )

vectordb = generate_vectordb(file_name, splits, persist_directory, embedding)


summary = ''
for key, values in topics.items():
    summary += key
    summary += " "
    for value in values:
        summary += value
        summary += " "

num_questions = 10

questions_schema = ResponseSchema(name='questions',
                            description="a str of question 1, question 2, etc")

response_schemas = [questions_schema]
                                                
output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
f_instructions = output_parser.get_format_instructions()
# print(f_instructions)

def generate_initial_questions(topic, subtopics, num_questions, summary):
    prompt = f"""Create {num_questions} questions about {topic} covering all these subtopics:{subtopics} and more in the {summary} era. 
    """
    response = llm(prompt)
        # Parse the response to get the list of topics and their citations
    if isinstance(response, str):
        topics_with_citations = response
    else:
        # Parse the response to get the list of topics and their citations
        topics_with_citations = response["choices"][0]["text"]
    return topics_with_citations

questions_schema = ResponseSchema(name='questions',
                            description="a list of question 1, question 2, etc")
answers_schema = ResponseSchema(name='answers',
                                    description=" a list of answers 1 to question 1,answers 2 to questions 2, etc")

response_schemas = [questions_schema,
                    answers_schema]
                                                
output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
instructions = output_parser.get_format_instructions()
# print(instructions)


def answer_generation (questions, vectordb):    
    docs = vectordb.similarity_search(questions)
    retriever = vectordb.as_retriever()
    qdocs = "".join([docs[i].page_content for i in range(len(docs))])
    response = llm(f"{qdocs} Questions: {questions} Follow the following instructions: {instructions} ")
    return response


whole_qa = {}
import json
for key, values in topics.items():
    topic = key
    subtopics = values
    questions = generate_initial_questions(topic, subtopics, num_questions, summary)
    q_a = answer_generation(questions, vectordb)
    first_bracket_index = q_a.find('{')
    
    # Find the index of the last occurrence of '}'
    last_bracket_index = q_a.rfind('}')
    q_a_string = q_a[first_bracket_index: last_bracket_index + 1]
    try:
        q_a_dict = json.loads(q_a_string)
    # print(q_a_dict)
        whole_qa[topic] = q_a_dict
    except:
        print("")
    # output_dict = output_parser.parse(q_a)
    # print(output_dict)
    # whole_qa[topic] = output_dict

quizzes = {}
for keys, values in whole_qa.items():
    quizzes[keys] = {}
    quizzes[keys]['questions'] = []
    for index, i in enumerate(values['questions']):
        question = {}
        question['id'] = index + 1
        question['question'] = i
        question['type'] = "open_ended"
        question['correct_answer'] = values['answers'][index]
        quizzes[keys]['questions'] += [question]

print(json.dumps(quizzes))