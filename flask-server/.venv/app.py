import fitz
from transformers import AutoModelForQuestionAnswering, AutoTokenizer
from haystack.document_stores import InMemoryDocumentStore
from haystack.nodes import TextConverter, PreProcessor, FARMReader
from haystack.pipelines import QuestionAnswerGenerationPipeline
from flask import Flask, request, jsonify

app = Flask(__name__)

model_name = "deepset/roberta-base-squad2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForQuestionAnswering.from_pretrained(model_name)

document_store = InMemoryDocumentStore()
converter = TextConverter(remove_numeric_tables=True, valid_languages=["en"])
preprocessor = PreProcessor(
    clean_empty_lines=True,
    clean_whitespace=True,
    clean_header_footer=False,
    split_by="token",
    split_length=100,
    split_respect_sentence_boundary=True,
)
reader = FARMReader(model=model, tokenizer=tokenizer, top_k=3)
qag_pipeline = QuestionAnswerGenerationPipeline(question_generator=None, reader=reader)  

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with fitz.open(pdf_path) as pdf_document:
            for page_number in range(2, 3):
                page = pdf_document.load_page(page_number)
                text += page.get_text()
    except fitz.FileDataError as e:
        print(f"Error extracting text: {e}")
    return text

def process_and_generate(file):
    try:
        if file.content_type in ["application/pdf", "text/plain"]:
            extracted_text = extract_text_from_pdf(file.filename) if file.content_type == "application/pdf" else file.read().decode("utf-8")
            doc_txt = converter.convert(file_path=None, meta=None, content=extracted_text)[0]
            docs = preprocessor.process([doc_txt])

            document_store.write_documents(docs)
            results = qag_pipeline.run(documents=docs)

            # Extract questions and answers from results
            questions = []
            answers = []
            for result in results:
                for question, answer in zip(result["queries"], result["answers"]):
                    questions.append(question)
                    answers.append(answer["answer"])

            return {"questions": questions, "answers": answers}
        else:
            return {"error": "Please upload a PDF or TXT file."}
    except Exception as e:
        print(f"Error processing file: {e}")
        return {"error": "An error occurred during processing. Please try again later."}
    
@app.route("/upload", methods=["GET", "POST"])
def upload_file():
    if request.method == 'POST':
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        
        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400
        else:
            process_and_generate(file)
