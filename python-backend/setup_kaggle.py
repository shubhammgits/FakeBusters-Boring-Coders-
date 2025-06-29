import os
import json
import shutil

def setup_kaggle_credentials():
    """Setup Kaggle API credentials"""
    
    print("Setting up Kaggle credentials...")
    
    # Get credentials from user
    username = input("Enter your Kaggle username: ")
    key = input("Enter your Kaggle API key: ")
    
    # Create kaggle.json
    kaggle_config = {
        "username": username,
        "key": key
    }
    
    # Create .kaggle directory
    kaggle_dir = os.path.expanduser('~/.kaggle')
    os.makedirs(kaggle_dir, exist_ok=True)
    
    # Write kaggle.json
    kaggle_json_path = os.path.join(kaggle_dir, 'kaggle.json')
    with open(kaggle_json_path, 'w') as f:
        json.dump(kaggle_config, f)
    
    # Set proper permissions
    os.chmod(kaggle_json_path, 0o600)
    
    print(f"Kaggle credentials saved to {kaggle_json_path}")
    print("You can now use the Kaggle API!")

if __name__ == "__main__":
    setup_kaggle_credentials()
