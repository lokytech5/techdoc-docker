import os
import requests
import time

model_base_url = "https://techdoc-model-bucket.s3.us-east-1.amazonaws.com/sshleifer--distilbart-cnn-12-6"
model_folder = "sshleifer--distilbart-cnn-12-6"
model_files = [
    'config.json',
    'pytorch_model.bin',
    'tokenizer.json',
    'tokenizer_config.json',
    'vocab.json',
    'merges.txt'
]

# Ensure local model directory exists
if not os.path.exists(model_folder):
    os.makedirs(model_folder)
    print(f"📁 Created local model directory: {model_folder}")

start_time = time.time()

for file_name in model_files:
    local_path = os.path.join(model_folder, file_name)
    url = f"{model_base_url}/{file_name}"

    if os.path.exists(local_path):
        print(f"✅ {file_name} already exists, skipping.")
        continue

    print(f"⬇️ Downloading {file_name} from {url}...")
    try:
        response = requests.get(url, timeout=120)
        response.raise_for_status()
        with open(local_path, 'wb') as f:
            f.write(response.content)
        print(f"✅ Downloaded and saved: {file_name}")
    except Exception as e:
        print(f"❌ Error downloading {file_name}: {e}")

elapsed = time.time() - start_time
print(f"⏱️ Model download process completed in {elapsed:.2f} seconds.")
