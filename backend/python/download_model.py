import os
import time
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, AutoConfig
from requests.exceptions import ConnectionError, Timeout
from transformers.utils import logging

# Set logging level to INFO
logging.set_verbosity_info()

def download_and_save_model(model_name, save_directory, retries=5, initial_delay=10):
    """
    Download and save the model and tokenizer files locally.
    
    Parameters:
    model_name (str): The model name or identifier from Hugging Face.
    save_directory (str): The local directory where the model files should be saved.
    retries (int): Number of retry attempts.
    initial_delay (int): Initial delay between retries in seconds.
    """
    if not os.path.exists(save_directory):
        os.makedirs(save_directory, exist_ok=True)

    def download_with_retries(download_func, *args, **kwargs):
        delay = initial_delay
        for attempt in range(retries):
            try:
                return download_func(*args, **kwargs)
            except (ConnectionError, Timeout) as e:
                logging.get_logger().info(f"Attempt {attempt + 1} failed: {e}")
                if attempt < retries - 1:
                    logging.get_logger().info(f"Retrying in {delay} seconds...")
                    time.sleep(delay)
                    delay *= 2  # Exponential backoff
        raise RuntimeError("Failed to download after several attempts")

    # Download the model
    model = download_with_retries(AutoModelForSeq2SeqLM.from_pretrained, model_name, timeout=600)
    model.save_pretrained(save_directory)
    
    # Download the tokenizer
    tokenizer = download_with_retries(AutoTokenizer.from_pretrained, model_name, timeout=600)
    tokenizer.save_pretrained(save_directory)
    
    # Download the config
    config = download_with_retries(AutoConfig.from_pretrained, model_name, timeout=600)
    config.save_pretrained(save_directory)

    print(f"Model, tokenizer, and config for '{model_name}' have been saved to '{save_directory}'.")

if __name__ == "__main__":
    model_name = "sshleifer/distilbart-cnn-12-6"  # Replace with your model name
    save_directory = "/Users/lokosman/Desktop/model"  # Replace with a valid writable directory path

    download_and_save_model(model_name, save_directory)
