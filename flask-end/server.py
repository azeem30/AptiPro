from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
import PyPDF2
import textract
from tqdm.auto import tqdm
from haystack.document_stores import InMemoryDocumentStore
from haystack.nodes import TextConverter, PreProcessor
from haystack.nodes import QuestionGenerator, FARMReader
from haystack.pipelines import QuestionAnswerGenerationPipeline

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploaded_files'
TEXT_FOLDER = 'generated_text\\untitled.txt'
ALLOWED_EXTENSIONS = {'pdf', 'txt'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as f:
            pdf_reader = PyPDF2.PdfReader(f)
            for page_number in range(len(pdf_reader.pages)):
                text += pdf_reader.pages[page_number].extract_text()
    except Exception as e:
        text = textract.process(pdf_path).decode('utf-8')
    return text

def write_text(text):
    with open(TEXT_FOLDER, 'w', encoding='utf-8') as file:
        file.write(text)

def preprocess():
    converter = TextConverter(remove_numeric_tables=True, valid_languages=["en"])
    preprocessor = PreProcessor(
            clean_empty_lines=True,
            clean_whitespace=True,
            clean_header_footer=False,
            split_by="token",
            split_length=500,
            split_respect_sentence_boundary=True,
    )
    doc_txt = converter.convert(file_path=TEXT_FOLDER, meta=None)[0]
    docs_default = preprocessor.process([doc_txt])
    return docs_default

def write_to_document_store(docs_default):
    document_store = InMemoryDocumentStore()
    document_store.write_documents(docs_default)
    return document_store

def execute_pipeline(document_store):
    question_generator = QuestionGenerator()
    reader = FARMReader("timpal0l/mdeberta-v3-base-squad2", top_k=1)
    qag_pipeline = QuestionAnswerGenerationPipeline(question_generator, reader)
    results = []
    for idx, document in enumerate(tqdm(document_store)):
        print(f"\n * Generating questions and answers for document {idx}: {document.content[:100]}...\n")
        result = qag_pipeline.run(documents=[document])
        results.append(result)
    return results

def filter_results(results):
    filtered_results = []
    for i in range(len(results)):
        filtered_result = {
            'queries': results[i]['queries'],
            'answers': results[i]['answers']
        }
        filtered_results.append(filtered_result)
    return filtered_results

def structure_results(filtered_results):
    pairs = []
    for result in filtered_results:
        questions = result['queries']
        answers = result['answers']
        for i in range(len(questions)):
            question = questions[i]
            if answers[i]:
                top_answer = answers[i][0].answer
                pairs.append({'question': question, 'answer': top_answer})
    return json.dumps(pairs, indent=4)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        text = extract_text_from_pdf(filepath) if filename.endswith('.pdf') else file.read().decode("utf-8") 
        write_text(text) 
        docs_default = preprocess()
        document_store = write_to_document_store(docs_default)
        results = execute_pipeline(document_store)
        filtered_results = filter_results(results)
        pairs = structure_results(filtered_results)
        print(pairs)
        return pairs
    else:
        return jsonify({'error': 'Invalid file format'})

if __name__ == '__main__':
    app.run(debug=True)
