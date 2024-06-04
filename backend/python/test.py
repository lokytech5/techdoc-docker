import boto3
import subprocess
import json
import os

# Define the S3 bucket and test file details
bucket_name = "techdoc-model"
test_file_name = "simple_test.txt"
model_folder = "sshleifer--distilbart-cnn-12-6"

# Initialize the boto3 client with your AWS credentials
s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_DEFAULT_REGION")
)

# Download the test file from S3
s3_client.download_file(bucket_name, test_file_name, 'simple_test.txt')

# List of model files to download
model_files = ['config.json', 'pytorch_model.bin', 'tokenizer_config.json', 'vocab.json', 'merges.txt']

# Ensure the model folder exists
if not os.path.exists(model_folder):
    os.makedirs(model_folder)

# Check if model files are already downloaded
all_files_exist = all(os.path.exists(os.path.join(model_folder, file_name)) for file_name in model_files)

# Print debug information
for file_name in model_files:
    file_path = os.path.join(model_folder, file_name)
    if os.path.exists(file_path):
        print(f"{file_path} exists")
    else:
        print(f"{file_path} does not exist")

if not all_files_exist:
    print("Downloading model files from S3...")
    # Download model files from S3
    for file_name in model_files:
        s3_key = f"{model_folder}/{file_name}"
        local_file_path = os.path.join(model_folder, file_name)
        print(f"Downloading {s3_key} to {local_file_path}")
        try:
            s3_client.download_file(bucket_name, s3_key, local_file_path)
            print(f"Successfully downloaded {s3_key}")
        except s3_client.exceptions.NoSuchKey:
            print(f"File {s3_key} not found in bucket {bucket_name}")
        except Exception as e:
            print(f"Error downloading {s3_key}: {e}")
else:
    print("Model files already exist locally. Skipping download.")

# Read the input text from the downloaded file
with open('simple_test.txt', 'r') as file:
    input_text = file.read()

# Convert the input text to JSON
input_json = json.dumps({"text": input_text})

# Run the model.py script
process = subprocess.Popen(
    ["python", "model.py"],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)

# Send the input text to the model.py script
stdout, stderr = process.communicate(input=input_json.encode('utf-8'))

# Print the output from the model.py script
print("Output:")
print(stdout.decode('utf-8'))

# Print any errors
if stderr:
    print("Errors:")
    print(stderr.decode('utf-8'))
