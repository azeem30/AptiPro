import pdfplumber
import re
import os

input_path = r"C:\Users\azeem\OneDrive\Azeem Documents\Desktop\MyProjects\AptiPro\flask-end\genassess\pdf"
output_path = r"C:\Users\azeem\OneDrive\Azeem Documents\Desktop\MyProjects\AptiPro\flask-end\genassess\dataset"
os.makedirs(output_path, exist_ok = True)

# Text Preprocessing

def clean_text(text):
  text = re.sub(r'[^\w\s]', '', text)
  text = re.sub(r'\s+', ' ', text)
  return text.strip()

def process_pdf(pdf_path, text_path):
    with pdfplumber.open(pdf_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text() or ""
    cleaned_text = clean_text(text)
    with open(text_path, 'w', encoding='utf-8') as file:
        file.write(cleaned_text)

for filename in os.listdir(input_path):
  if filename.lower().endswith(".pdf"):
    pdf_path = os.path.join(input_path, filename)
    text_filename = os.path.splitext(filename)[0] + ".txt"
    text_path = os.path.join(output_path, text_filename)
    process_pdf(pdf_path, text_path)