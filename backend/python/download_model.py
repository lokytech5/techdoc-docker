# download_model.py
import boto3
from botocore.config import Config
import os

# Print environment variables for debugging
print("AWS_ACCESS_KEY_ID:", os.getenv("AWS_ACCESS_KEY_ID"))
print("AWS_SECRET_ACCESS_KEY:", os.getenv("AWS_SECRET_ACCESS_KEY"))
print("AWS_DEFAULT_REGION:", os.getenv("AWS_DEFAULT_REGION"))

# Ensure environment variables are not empty
if not all([os.getenv("AWS_ACCESS_KEY_ID"), os.getenv("AWS_SECRET_ACCESS_KEY"), os.getenv("AWS_DEFAULT_REGION")]):
    raise ValueError("One or more environment variables are missing")

# Configure boto3 client with increased timeout
config = Config(connect_timeout=300, read_timeout=300)
s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_DEFAULT_REGION"),
    config=config
)

# Define the S3 bucket and model file details
bucket_name = "techdoc-model"
model_folder = "sshleifer--distilbart-cnn-12-6"

# Define the local model directory
local_model_path = os.path.join(os.getcwd(), model_folder)

# Create local model directory if it doesn't exist
if not os.path.exists(local_model_path):
    os.makedirs(local_model_path)

# List of model files to download
model_files = ['config.json', 'pytorch_model.bin', 'tokenizer.json', 'tokenizer_config.json', 'vocab.json', 'merges.txt']

# Download the model files from S3
for file_name in model_files:
    s3_key = f"{model_folder}/{file_name}"
    local_file_path = os.path.join(local_model_path, file_name)
    print(f"Downloading {s3_key} to {local_file_path}")
    try:
        s3_client.download_file(bucket_name, s3_key, local_file_path)
        print(f"Successfully downloaded {s3_key}")
    except s3_client.exceptions.NoSuchKey:
        print(f"File {s3_key} not found in bucket {bucket_name}")
    except Exception as e:
        print(f"Error downloading {s3_key}: {e}")

print("Model files download process completed.")
