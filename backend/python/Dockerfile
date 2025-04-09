# Stage 1: Download and cache model files
FROM python:3.9-slim-buster as model-downloader

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    libffi-dev \
    libssl-dev \
    curl \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install

# Set up the working directory
WORKDIR /app

# Copy requirements file to install boto3
COPY requirements.txt /app/requirements.txt

# Install Python dependencies, including boto3
RUN pip install --upgrade pip setuptools wheel && \
    pip install boto3

# Copy download script
COPY download_model.py /app/download_model.py

# Set environment variables for AWS credentials and region
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION

ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}

# Run the script to download model files from S3
RUN python /app/download_model.py

# Stage 2: Build the final image
FROM python:3.9-slim-buster

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    libffi-dev \
    libssl-dev \
    python3-dev \
    curl \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*


# Install AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install

# Set up the working directory
WORKDIR /app

# Copy the Python requirements file and Python script into the working directory
COPY requirements.txt /app/requirements.txt
COPY . /app

# Set up the Python virtual environment
RUN python3 -m venv /opt/venv

# Activate the virtual environment and install Python dependencies
RUN /opt/venv/bin/pip install --upgrade pip setuptools wheel && \
    /opt/venv/bin/pip install --prefer-binary --no-cache-dir -r /app/requirements.txt


# Download the spaCy model with increased timeout
RUN /opt/venv/bin/python -m spacy download en_core_web_sm

# Copy model files from the previous stage
COPY --from=model-downloader /app/sshleifer--distilbart-cnn-12-6 /app/sshleifer--distilbart-cnn-12-6

# Set environment variables for AWS credentials and region
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION

ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}

# Copy the test script into the working directory
COPY test.py /app/test.py

# Debug step: Print environment variables
RUN echo "AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID" && \
    echo "AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY" && \
    echo "AWS_DEFAULT_REGION: $AWS_DEFAULT_REGION"

# Ensure the virtual environment is activated
ENV PATH="/opt/venv/bin:$PATH"

# Define the command to run the Flask application
CMD ["python", "/app/model.py"]
