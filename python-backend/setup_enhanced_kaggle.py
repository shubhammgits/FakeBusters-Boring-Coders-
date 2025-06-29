#!/usr/bin/env python3
"""
Enhanced Kaggle Setup Script for FakeBuster
Sets up Kaggle API credentials and downloads multiple datasets
"""

import os
import json
import sys
from pathlib import Path

def setup_kaggle_credentials():
    """Setup Kaggle API credentials"""
    print("🔧 Setting up Kaggle API credentials...")
    
    kaggle_dir = Path.home() / '.kaggle'
    kaggle_json_path = kaggle_dir / 'kaggle.json'
    
    if kaggle_json_path.exists():
        print("✅ Kaggle credentials already exist!")
        return True
    
    print("\n📋 To get your Kaggle API credentials:")
    print("1. Go to https://www.kaggle.com/")
    print("2. Click on your profile picture → Account")
    print("3. Scroll to API section → Create New API Token")
    print("4. Download kaggle.json file")
    
    # Get credentials from user
    username = input("\nEnter your Kaggle username: ").strip()
    api_key = input("Enter your Kaggle API key: ").strip()
    
    if not username or not api_key:
        print("❌ Username and API key are required!")
        return False
    
    # Create .kaggle directory
    kaggle_dir.mkdir(exist_ok=True)
    
    # Create kaggle.json
    credentials = {
        "username": username,
        "key": api_key
    }
    
    with open(kaggle_json_path, 'w') as f:
        json.dump(credentials, f)
    
    # Set proper permissions (Unix/Linux/Mac)
    if os.name != 'nt':  # Not Windows
        os.chmod(kaggle_json_path, 0o600)
    
    print("✅ Kaggle credentials saved successfully!")
    return True

def test_kaggle_connection():
    """Test Kaggle API connection"""
    print("\n🔍 Testing Kaggle API connection...")
    
    try:
        import kaggle
        
        # Test API connection
        kaggle.api.authenticate()
        datasets = kaggle.api.dataset_list(search='deepfake', page_size=5)
        
        print("✅ Kaggle API connection successful!")
        print(f"Found {len(datasets)} deepfake datasets")
        return True
        
    except Exception as e:
        print(f"❌ Kaggle API connection failed: {str(e)}")
        return False

def download_datasets():
    """Download the required datasets"""
    print("\n📥 Downloading enhanced datasets...")
    
    try:
        import kaggle
        
        datasets_dir = Path('datasets')
        datasets_dir.mkdir(exist_ok=True)
        
        # Dataset 1: manjilkarki/deepfake-and-real-images
        print("📥 Downloading manjilkarki/deepfake-and-real-images...")
        dataset1_dir = datasets_dir / 'manjilkarki'
        dataset1_dir.mkdir(exist_ok=True)
        
        kaggle.api.dataset_download_files(
            'manjilkarki/deepfake-and-real-images',
            path=str(dataset1_dir),
            unzip=True
        )
        print("✅ Dataset 1 downloaded successfully!")
        
        # Dataset 2: saurabhbagchi/deepfake-image-detection
        print("📥 Downloading saurabhbagchi/deepfake-image-detection...")
        dataset2_dir = datasets_dir / 'saurabhbagchi'
        dataset2_dir.mkdir(exist_ok=True)
        
        kaggle.api.dataset_download_files(
            'saurabhbagchi/deepfake-image-detection',
            path=str(dataset2_dir),
            unzip=True
        )
        print("✅ Dataset 2 downloaded successfully!")
        
        # Verify downloads
        print("\n📊 Verifying downloads...")
        
        # Check dataset 1
        dataset1_path = dataset1_dir / 'Dataset'
        if dataset1_path.exists():
            real_path = dataset1_path / 'Real'
            fake_path = dataset1_path / 'Fake'
            
            if real_path.exists() and fake_path.exists():
                real_count = len(list(real_path.glob('*.jpg')) + list(real_path.glob('*.png')))
                fake_count = len(list(fake_path.glob('*.jpg')) + list(fake_path.glob('*.png')))
                print(f"✅ Dataset 1: {real_count} real, {fake_count} fake images")
            else:
                print("⚠️ Dataset 1: Folder structure not as expected")
        
        # Check dataset 2
        print("🔍 Checking dataset 2 structure...")
        for item in dataset2_dir.iterdir():
            if item.is_dir():
                count = len(list(item.glob('*.jpg')) + list(item.glob('*.png')))
                if count > 0:
                    print(f"✅ Dataset 2: Found {count} images in {item.name}/")
        
        return True
        
    except Exception as e:
        print(f"❌ Error downloading datasets: {str(e)}")
        return False

def install_requirements():
    """Install required Python packages"""
    print("\n📦 Installing required packages...")
    
    try:
        import subprocess
        import sys
        
        # Install packages
        subprocess.check_call([
            sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'
        ])
        
        print("✅ All packages installed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error installing packages: {str(e)}")
        return False

def main():
    """Main setup function"""
    print("🚀 FakeBuster Enhanced Kaggle Setup")
    print("=" * 50)
    
    # Step 1: Install requirements
    if not install_requirements():
        print("❌ Setup failed at package installation")
        return False
    
    # Step 2: Setup Kaggle credentials
    if not setup_kaggle_credentials():
        print("❌ Setup failed at credentials setup")
        return False
    
    # Step 3: Test connection
    if not test_kaggle_connection():
        print("❌ Setup failed at connection test")
        return False
    
    # Step 4: Download datasets
    if not download_datasets():
        print("❌ Setup failed at dataset download")
        return False
    
    print("\n🎉 Enhanced setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Run: python app.py")
    print("2. The enhanced model will train automatically")
    print("3. Start your Next.js frontend")
    print("4. Test the enhanced deepfake detection!")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
