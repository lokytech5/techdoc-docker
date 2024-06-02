# Use the official Debian-based Python image
FROM python:3.9-slim-buster

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    libffi-dev \
    libssl-dev \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set up the working directory
WORKDIR /app

# Copy the Python requirements file and Python script into the working directory
COPY requirements.txt /app/requirements.txt
COPY . /app

# Set up the Python virtual environment
RUN python3 -m venv /opt/venv

# Activate the virtual environment and install Python dependencies
RUN /opt/venv/bin/pip install --upgrade pip setuptools wheel && \
    /opt/venv/bin/pip install -r /app/requirements.txt

# Download the spaCy model with increased timeout
RUN /opt/venv/bin/python -m spacy download en_core_web_sm

# Ensure the virtual environment is activated
ENV PATH="/opt/venv/bin:$PATH"

# Define the command to run the Flask application
CMD ["python", "/app/model.py"]
