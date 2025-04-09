FROM python:3.9-slim-buster

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    libffi-dev \
    libssl-dev \
    curl \
    unzip \
    python3-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy your code
COPY . /app

# Install dependencies
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Download spaCy model
RUN python -m spacy download en_core_web_sm

# Make sure start script is executable
RUN chmod +x start.sh

# Start the app
CMD ["./start.sh"]
