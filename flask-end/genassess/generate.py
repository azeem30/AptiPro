import torch
from transformers import T5Tokenizer

tokenizer = T5Tokenizer.from_pretrained('t5-base')
model = torch.load(r'C://Users//azeem//OneDrive//Azeem Documents//Desktop//MyProjects//AptiPro//flask-end//genassess//t5-trained.pkl', map_location=torch.device('cpu'))
model.eval()

def generate_question_answer(context, question=None):
    if question is None:
        input_text = f"Generate a question based on {context}"
    else:
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

question = "What is Hashing?"

answer = generate_question_answer(context, question)