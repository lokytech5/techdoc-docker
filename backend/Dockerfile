# Use the official Node.js image based on Debian
FROM node:18-bullseye-slim

# Set the working directory
WORKDIR /app

# Install Python and other dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    build-essential \
    libffi-dev \
    libssl-dev \
    curl \
    && apt-get clean

# Set up the Python virtual environment
RUN python3 -m venv /opt/venv

# Activate virtual environment and install Python dependencies directly
RUN . /opt/venv/bin/activate && pip install --no-cache-dir spacy transformers torch

# Download and install the spaCy model
RUN . /opt/venv/bin/activate && python -m spacy download en_core_web_sm

# Ensure the virtual environment is activated for future commands
RUN echo "source /opt/venv/bin/activate" >> ~/.bashrc

# Copy the package.json and package-lock.json
COPY package*.json ./

# Copy the Prisma schema file
COPY prisma/schema.prisma ./prisma/

# Install Node.js dependencies
RUN npm install

# Rebuild bcrypt from source
RUN npm rebuild bcrypt --build-from-source

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Copy the Python script and models into the working directory
COPY backend/python/model.py /app/backend/python/model.py
COPY backend/python/models/models--sshleifer--distilbart-cnn-12-6 /app/backend/python/models/models--sshleifer--distilbart-cnn-12-6

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["sh", "-c", "source /opt/venv/bin/activate && npm start"]
