#!/bin/bash

echo "🚀 Starting model download..."
python download_model.py

echo "✅ Model downloaded. Launching app..."
python model.py
