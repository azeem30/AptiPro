from transformers import T5ForConditionalGeneration, T5Tokenizer
from haystack.document_stores import InMemoryDocumentStore
from haystack.nodes import QuestionGenerator
from haystack.pipelines import QuestionGenerationPipeline

model_directory = "D://Model//"
tokenizer_directory = "D://Tokenizer//"
tokenizer = T5Tokenizer.from_pretrained(tokenizer_directory)
model = T5ForConditionalGeneration.from_pretrained(model_directory)

def doc_store_init(context):
    document_store = InMemoryDocumentStore()
    docs = [{"content": context}]
    document_store.write_documents(docs)
    return document_store

def generate_questions(question_pipeline, docs):
    generated_questions = []
    for document in docs:
        result = question_pipeline.run(documents=[document])
        questions = result['generated_questions'][0]['questions']
        generated_questions.extend(questions)
    return generated_questions

def question_init(context):
    question_generator = QuestionGenerator()
    question_generation_pipeline = QuestionGenerationPipeline(question_generator)
    docs = doc_store_init(context).get_all_documents()
    questions = generate_questions(question_generation_pipeline, docs)
    return questions

def generate_answer(context, question):
    input_text = f"Answer the following question: {question} based on the context: {context}"
    input_tokens = tokenizer(input_text, return_tensors='pt', padding=True, truncation=True, max_length=1024)
    outputs = model.generate(input_ids=input_tokens['input_ids'], attention_mask=input_tokens['attention_mask'], num_beams=5, max_length=1000, early_stopping=True)
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return generated_text

context = '''
Hashing is a fundamental concept in computer science, where it involves transforming input data of any length into a fixed-size string of characters, which is typically a hash value or digest, through a hash function.
This process is crucial for a wide range of applications, including data retrieval, cryptography, and efficient data storage.
The key property of a hash function is that it must consistently produce the same output (hash) for the same input and distribute inputs uniformly across the output space to minimize hash collisions, where two distinct inputs map to the same output.
In hash tables, for instance, hashing enables constant-time complexity for search, insert, and delete operations, making it an efficient solution for large datasets.
Cryptographic hashing, such as algorithms like MD5, SHA-1, or SHA-256, provides additional security properties, ensuring the hash is hard to reverse (one-way function) and making it computationally infeasible to find two distinct inputs that produce the same hash (collision resistance).
These cryptographic hash functions play a vital role in password storage (where passwords are stored as hashes rather than plaintext), data integrity verification, digital signatures, and blockchain technology, where they secure and verify transactions.
Hashing is also used in checksums to detect errors in data transmission and in modern search engines to index and retrieve massive volumes of data quickly.
Despite its numerous benefits, the challenge in hashing is managing collisions, which can be handled through techniques like chaining (linking colliding elements in a list) or open addressing (finding another open slot in the table).
Thus, hashing serves as a versatile and efficient tool, ensuring fast access, data security, and integrity across various systems.
'''
questions = question_init(context)
answers = []
for question in questions:
    answer = generate_answer(context, question)
    answers.add(answer)
