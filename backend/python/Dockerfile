FROM python:3.9-slim-buster

WORKDIR /app

# Install system dependencies (minimal)
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy your code
COPY . /app

# Install Python dependencies (optimized)
RUN pip install --upgrade pip && pip install --prefer-binary --no-cache-dir -r requirements.txt

# Download spaCy model
RUN python -m spacy download en_core_web_sm

# Make sure start script is executable
RUN chmod +x start.sh

# Start the app
CMD ["./start.sh"]
