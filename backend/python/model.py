import sys
import json
import spacy
from transformers import pipeline

import warnings

# Ignore specific warnings
warnings.filterwarnings("ignore", message="torch.utils._pytree._register_pytree_node is deprecated")
warnings.filterwarnings("ignore", message="resume_download is deprecated")


# Load spaCy model and transformer pipeline
nlp = spacy.load('en_core_web_sm')
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

def extract_keywords(text):
    doc = nlp(text)
    return [token.text for token in doc if token.pos_ in ['NOUN', 'VERB']]

def summarize_text(text):
    input_length = len(text.split())
    max_length = min(input_length + 10, 150)  # Adjust max_length dynamically
    return summarizer(text, max_length=max_length, min_length=40, do_sample=False)[0]['summary_text']

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    text = input_data.get('text')
    
    if text:
        keywords = extract_keywords(text)
        summary = summarize_text(text)
        output = {
            'keywords': keywords,
            'summary': summary
        }
        print(json.dumps(output))
    else:
        print(json.dumps({'error': 'No text provided'}))
