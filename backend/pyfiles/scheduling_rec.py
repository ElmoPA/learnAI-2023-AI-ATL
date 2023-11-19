
# Numpy and Pandas
import numpy as np
import pandas as pd
import os
import time
import json
import random
import datetime
from collections import defaultdict, deque
from transformers import pipeline

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
from langchain.evaluation.qa.generate_chain import QAGenerateChain

# Vertex AI
from google.cloud import aiplatform
from langchain.chat_models import ChatVertexAI
from langchain.llms import VertexAI
from langchain.embeddings import VertexAIEmbeddings
from langchain.schema import HumanMessage, SystemMessage
from langchain.embeddings.vertexai import VertexAIEmbeddings
embedding = VertexAIEmbeddings()

# print(f"LangChain version: {langchain.__version__}")
# print(f"Vertex AI SDK version: {aiplatform.__version__}")
persist_directory = 'data/chroma/v0/'
embedding = VertexAIEmbeddings(model_name='textembedding-gecko-multilingual@001')

persist_directory = 'data/chroma/v0/'
embedding = VertexAIEmbeddings()
llm = VertexAI(model_name="text-bison@001",
            max_output_tokens=1000,
            temperature=0.0,
            top_p=0.8,
            top_k=40,
            verbose=True)

def split_string(large_string, length=4000):
    # This will cut the string into parts of size `length` and put it in a list.
    return [large_string[i:i+length] for i in range(0, len(large_string), length)]

from google.cloud import storage

def download_directory_from_gcs(bucket_name, directory_path, local_download_path):
    """Downloads all files from a specific directory in a GCS bucket."""
    client = storage.Client()
    bucket = client.bucket(bucket_name)

    blobs = bucket.list_blobs(prefix=directory_path)
    os.makedirs(local_download_path, exist_ok=True)
    for blob in blobs:
        if blob.name.endswith('/') or not blob.size:
            continue
        local_file_path = os.path.join(local_download_path, os.path.basename(blob.name))
        blob.download_to_filename(local_file_path)
        # print(f"Downloaded {blob.name} to {local_file_path}")

download_directory_from_gcs('user-main-database', 'user-1/Subject/History/TxtFile', 'tmp')

with open('tmp/lecture.txt','r') as f:
    data = f.read()
    max_token = 3400
    text_inputs = split_string(data, max_token)

# Load a summarization pipeline using a pre-trained model
summarizer = pipeline("summarization", model= 'sshleifer/distilbart-cnn-12-6')

def summarize_text(text):
    """
    This function takes a large body of text and summarizes it into a few words.
    """
    # Use the summarization pipeline to summarize the text
    summary = summarizer(text, max_length=15, min_length=1, do_sample=False)

    # Extract the summary text
    summary_text = summary[0]['summary_text']

    return summary_text

# Example usage
start_time = time.time()
summaries = ''
for text_input in text_inputs:
    text_to_summarize = text_input
    summary = summarize_text(text_to_summarize)
    summaries += summary
# print(summaries)
total_time = time.time() - start_time
# print(total_time)

causes_schema = ResponseSchema(name='causes',
                        description="a list of cause 1, cause 2, etc")
major_events_schema = ResponseSchema(name='major events',
                                description="a list of major event 1, major event 2, etc")
figures_schema = ResponseSchema(name='figures',
                                description="a list of figure 1, figure 2, etc")
consequences_schema = ResponseSchema(name='consequences',
                                description="a list of consequences 1, consequences 2, etc")                                                 

response_schemas = [causes_schema, 
                major_events_schema,
                figures_schema,
                consequences_schema]

output_parser = StructuredOutputParser.from_response_schemas(response_schemas)

format_instructions = output_parser.get_format_instructions()
# print(format_instructions)

def extract_study_topics(text,summary,format_instructions):

    # Define the prompt to instruct the language model
    prompt = f'''From the provided text on the {summary}, identify key topics for study and include specific citations from the text for each topic. Focus on major events, figures, causes, and consequences of the {summary} as described in the text. 
    
    text:{text}
    
    Follow the following instructions: {format_instructions}'''
    #prompt = f"Given this text, make a list of topics that should be studied, with citations from the text sections they are taken from: \"{text}\""
    # Use the language model to generate a response
    response = llm(prompt)
    
    # Parse the response to get the list of topics and their citations
    if isinstance(response, str):
        topics_with_citations = response
    else:
        # Parse the response to get the list of topics and their citations
        topics_with_citations = response["choices"][0]["text"]
    
    # print(topics_with_citations)
    # topics_dict = {}
    # for line in topics_with_citations.split('\n'):
    #     if ':' in line:
    #         topic, description = line.split(':', 1)
    #         topic = topic.strip().lower().replace('*', '').replace('.', '')
    #         topics_dict[topic] = description.strip()

    return topics_with_citations



import time
start_time = time.time()
study_topics = extract_study_topics(data,summary,format_instructions)
# print(study_topics)
total_time = time.time() - start_time
# print(total_time)

output_dict = output_parser.parse(study_topics)
# first_bracket_index = study_topics.find('{')
    
# # Find the index of the last occurrence of '}'
# last_bracket_index = study_topics.rfind('}')
# study_string= study_topics[first_bracket_index: last_bracket_index + 1]
# print(study_string)
# try:
#     output_dict = json.loads(study_string)
#     print(output_dict)
# except:
#     print(f"Error: Parse Error")


# first_bracket_index = study_topics.find('{')
    
# # Find the index of the last occurrence of '}'
# last_bracket_index = study_topics.rfind('}')
# study_string= study_topics[first_bracket_index: last_bracket_index + 1]
# try:
#     output_dict = json.loads(study_string)
#     print(output_dict)
# except:
#     print(f"Error: Parse Error")

topics = {}
for key, values in output_dict.items():
    for i in values:
        topics[key + ': ' + i] = {"score": np.random.randint(40,100), "hours_needed":0.25}
# print(topics)


subjects = {}
subjects["History of the U.S. Civil War"] = topics

with open('tmp/2014-thailand-coup.txt','r') as f:
    data = f.read()
    max_token = 3400
    text_inputs = split_string(data, max_token)

# Example usage
start_time = time.time()
summaries = ''
for text_input in text_inputs:
    text_to_summarize = text_input
    summary = summarize_text(text_to_summarize)
    summaries += summary
# print(summaries)
total_time = time.time() - start_time
# print(total_time)

causes_schema = ResponseSchema(name='causes',
                        description="a list of cause 1, cause 2, etc")
major_events_schema = ResponseSchema(name='major events',
                                description="a list of major event 1, major event 2, etc")
figures_schema = ResponseSchema(name='figures',
                                description="a list of figure 1, figure 2, etc")
consequences_schema = ResponseSchema(name='consequences',
                                description="a list of consequences 1, consequences 2, etc")                                                 

response_schemas = [causes_schema, 
                major_events_schema,
                figures_schema,
                consequences_schema]

output_parser = StructuredOutputParser.from_response_schemas(response_schemas)

format_instructions = output_parser.get_format_instructions()
# print(format_instructions)

import time
start_time = time.time()
study_topics = extract_study_topics(text_inputs,summary,format_instructions)
# print(study_topics)
total_time = time.time() - start_time
# print(total_time)

output_dict = output_parser.parse(study_topics)
# first_bracket_index = study_topics.find('{')
    
# # Find the index of the last occurrence of '}'
# last_bracket_index = study_topics.rfind('}')
# study_string= study_topics[first_bracket_index: last_bracket_index + 1]
# try:
#     output_dict = json.loads(study_string)
#     print(output_dict)
# except:
#     print(f"Error: Parse Error")

t_topics = {}
for key, values in output_dict.items():
    for i in values:
        topics[key + ': ' + i] = {"score": np.random.randint(40,100), "hours_needed":0.25}
t_topics

subjects["Thailand_Coup"] = t_topics

subjects

import datetime
from collections import defaultdict, deque
import json


test_date = datetime.date(2023, 11, 29)
hours_per_day = 3  # Study hours per day
max_hours_per_topic_per_day = 0.5  # 30 minutes per topic

def calculate_priority(score, hours_needed, days_left):
    return (100 - score) + (hours_needed / days_left)

def update_priorities(subjects, days_until_test):
    for subject in subjects.values():
        for topic, data in subject.items():
            priority = calculate_priority(data["score"], data["hours_needed"], days_until_test)
            data["priority"] = priority

def schedule_creator(test_date, subjects, hours_per_day, max_hours_per_topic_per_day):
    today = datetime.date.today()
    days_until_test = (test_date - today).days

    repetition_intervals = deque([1, 3, 7, 14])

    update_priorities(subjects, days_until_test)

    study_schedule = defaultdict(list)
    studied_topics = defaultdict(lambda: {'last_studied': None, 'intervals': deque(repetition_intervals)})
    current_date = today

    while current_date <= test_date:
        daily_hours = hours_per_day
        for subject, topics in subjects.items():
            for topic, details in sorted(topics.items(), key=lambda x: x[1]["priority"], reverse=True):
                if daily_hours <= 0:
                    break
                if details["hours_needed"] > 0:
                    session_hours = min(daily_hours, details["hours_needed"], max_hours_per_topic_per_day)
                    study_schedule[current_date].append((f"{subject} - {topic}", session_hours))
                    details["hours_needed"] -= session_hours
                    daily_hours -= session_hours
                    studied_topics[f"{subject} - {topic}"]['last_studied'] = current_date

        for key, info in studied_topics.items():
            if info['last_studied'] and current_date - info['last_studied'] == datetime.timedelta(days=info['intervals'][0]):
                if daily_hours >= max_hours_per_topic_per_day:
                    study_schedule[current_date].extend([
                        (f"Review - {key}", 0.5),
                        (f"Flashcards - {key}", 0.25),
                        (f"Quiz - {key}", 0.25)
                    ])
                    daily_hours -= max_hours_per_topic_per_day
                    info['intervals'].rotate(-1)

        current_date += datetime.timedelta(days=1)

    # Print the schedule
    schedule = {}
    for date, sessions in sorted(study_schedule.items()):
        # print(f"Date: {date}")
        schedule[date] = {}
        for activity, hours in sessions:
            # print(f" - {activity} for {hours} hour(s)")
            schedule[date][activity] = int(float(hours)*60)

    # Convert schedule to a JSON format for calendar
    s_schedule = []
    for date, sessions in schedule.items():
        for activity, hours in sessions.items():
            day = {
                'title': activity + ' ' + str(hours) + ' minutes',
                'start': date.strftime("%Y-%m-%d"),
                'end': date.strftime("%Y-%m-%d"),
                'allDay': True
            }
            s_schedule.append(day)

    # Print and save the JSON schedule
    return json.dumps(s_schedule, indent=4)
    
with open('pyfiles/topics.json', 'w') as file:
    json.dump(topics, file)
print(schedule_creator(test_date, subjects, hours_per_day, max_hours_per_topic_per_day))



