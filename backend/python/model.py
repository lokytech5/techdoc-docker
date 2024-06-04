import sys
import json
import spacy
from transformers import pipeline, AutoModelForSeq2SeqLM, AutoTokenizer, AutoConfig
import os
import warnings
import logging
from flask import Flask, request, jsonify

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Ignore specific warnings
warnings.filterwarnings("ignore", message="torch.utils._pytree._register_pytree_node is deprecated")
warnings.filterwarnings("ignore", message="resume_download is deprecated")

# Define the local model directory
local_model_path = os.path.join(os.path.dirname(__file__), "sshleifer--distilbart-cnn-12-6")

# Load spaCy model
logger.info("Loading spaCy model...")
nlp = spacy.load('en_core_web_sm')
logger.info("Loaded spaCy model.")

# Load the model, tokenizer, and config from the local directory
logger.info("Loading summarization model and tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(local_model_path)
model = AutoModelForSeq2SeqLM.from_pretrained(local_model_path)
summarizer = pipeline("summarization", model=model, tokenizer=tokenizer)
logger.info("Loaded summarization model and tokenizer.")

def extract_keywords(text):
    doc = nlp(text)
    return [token.text for token in doc if token.pos_ in ['NOUN', 'VERB']]

def summarize_text(text):
    input_length = len(text.split())
    max_length = min(input_length, 150)  # Ensure max_length is not more than input_length
    min_length = min(40, max_length - 5)  # Ensure min_length is less than max_length
    return summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)[0]['summary_text']

app = Flask(__name__)

@app.route('/endpoint', methods=['POST'])
def handle_request():
    data = request.get_json()
    text = data.get('text')
    
    if text:
        keywords = extract_keywords(text)
        summary = summarize_text(text)
        output = {
            'keywords': keywords,
            'summary': summary
        }
        logger.info("Processing complete. Outputting results.")
        return jsonify(output)
    else:
        logger.error("No text provided")
        return jsonify({'error': 'No text provided'}), 400

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
