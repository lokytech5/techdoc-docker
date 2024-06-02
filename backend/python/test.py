import subprocess
import json

# Define the input text
input_text = {
    "text": "Natural language processing (NLP) is a field of artificial intelligence that gives the machines the ability to read, understand and derive meaning from human languages."
}

# Convert the input text to JSON
input_json = json.dumps(input_text)

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
