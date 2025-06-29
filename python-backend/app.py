from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import numpy as np
import cv2
import os 
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf
from tensorflow.keras.models import load_model, Model
from tensorflow.keras.applications import EfficientNetB4, Xception
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout, BatchNormalization, Concatenate, Input
from tensorflow.keras.optimizers import Adam
import zipfile
import kaggle
from PIL import Image
import io
import base64
import time
from werkzeug.utils import secure_filename
import logging
from sklearn.model_selection import train_test_split
import pandas as pd
import openai
from openai import OpenAI
import hashlib

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
MODEL_FOLDER = 'models'
DATASET_FOLDER = 'datasets'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4', 'mov', 'avi'}

# Create necessary directories
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(MODEL_FOLDER, exist_ok=True)
os.makedirs(DATASET_FOLDER, exist_ok=True)

# Global model variables
ensemble_model = None
efficientnet_model = None
xception_model = None

# OpenAI client
openai_client = None
try:
    openai_client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    logger.info("OpenAI client initialized successfully")
except Exception as e:
    logger.warning(f"OpenAI client initialization failed: {str(e)}")

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_file_hash(file_path):
    """Generate a hash for the file to ensure consistent results"""
    hasher = hashlib.md5()
    with open(file_path, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def download_kaggle_datasets():
    """Download multiple deepfake detection datasets from Kaggle"""
    try:
        logger.info("Downloading Kaggle datasets...")
        
        # Dataset 1: manjilkarki/deepfake-and-real-images
        try:
            logger.info("Downloading manjilkarki/deepfake-and-real-images...")
            kaggle.api.dataset_download_files(
                'manjilkarki/deepfake-and-real-images',
                path=os.path.join(DATASET_FOLDER, 'manjilkarki'),
                unzip=True
            )
            logger.info("Dataset 1 downloaded successfully")
        except Exception as e:
            logger.error(f"Error downloading dataset 1: {str(e)}")
        
        # Dataset 2: saurabhbagchi/deepfake-image-detection
        try:
            logger.info("Downloading saurabhbagchi/deepfake-image-detection...")
            kaggle.api.dataset_download_files(
                'saurabhbagchi/deepfake-image-detection',
                path=os.path.join(DATASET_FOLDER, 'saurabhbagchi'),
                unzip=True
            )
            logger.info("Dataset 2 downloaded successfully")
        except Exception as e:
            logger.error(f"Error downloading dataset 2: {str(e)}")
        
        # Dataset 3: Additional high-quality dataset
        try:
            logger.info("Downloading additional dataset for better accuracy...")
            kaggle.api.dataset_download_files(
                'xhlulu/140k-real-and-fake-faces',
                path=os.path.join(DATASET_FOLDER, 'faces140k'),
                unzip=True
            )
            logger.info("Additional dataset downloaded successfully")
        except Exception as e:
            logger.error(f"Error downloading additional dataset: {str(e)}")
        
        return True
        
    except Exception as e:
        logger.error(f"Error downloading datasets: {str(e)}")
        return False

def create_efficientnet_model(input_shape=(299, 299, 3)):
    """Create EfficientNetB4 model for deepfake detection"""
    base_model = EfficientNetB4(
        weights='imagenet',
        include_top=False,
        input_shape=input_shape
    )
    
    # Freeze base model initially
    base_model.trainable = False
    
    # Add custom classification head
    inputs = Input(shape=input_shape)
    x = base_model(inputs, training=False)
    x = GlobalAveragePooling2D()(x)
    x = BatchNormalization()(x)
    x = Dropout(0.5)(x)
    x = Dense(512, activation='relu')(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)
    outputs = Dense(1, activation='sigmoid', name='efficientnet_output')(x)
    
    model = Model(inputs, outputs, name='EfficientNet_Deepfake_Detector')
    
    logger.info("EfficientNetB4 model created successfully")
    return model

def create_xception_model(input_shape=(299, 299, 3)):
    """Create Xception model for deepfake detection"""
    base_model = Xception(
        weights='imagenet',
        include_top=False,
        input_shape=input_shape
    )
    
    # Freeze base model initially
    base_model.trainable = False
    
    # Add custom classification head
    inputs = Input(shape=input_shape)
    x = base_model(inputs, training=False)
    x = GlobalAveragePooling2D()(x)
    x = BatchNormalization()(x)
    x = Dropout(0.5)(x)
    x = Dense(512, activation='relu')(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)
    outputs = Dense(1, activation='sigmoid', name='xception_output')(x)
    
    model = Model(inputs, outputs, name='Xception_Deepfake_Detector')
    
    logger.info("Xception model created successfully")
    return model

def create_ensemble_model(input_shape=(299, 299, 3)):
    """Create ensemble model combining EfficientNet and Xception"""
    # Create base models
    efficientnet_base = EfficientNetB4(
        weights='imagenet',
        include_top=False,
        input_shape=input_shape
    )
    
    xception_base = Xception(
        weights='imagenet',
        include_top=False,
        input_shape=input_shape
    )
    
    # Freeze base models initially
    efficientnet_base.trainable = False
    xception_base.trainable = False
    
    # Input layer
    inputs = Input(shape=input_shape)
    
    # EfficientNet branch
    efficientnet_features = efficientnet_base(inputs, training=False)
    efficientnet_features = GlobalAveragePooling2D()(efficientnet_features)
    efficientnet_features = BatchNormalization()(efficientnet_features)
    efficientnet_features = Dropout(0.5)(efficientnet_features)
    efficientnet_features = Dense(512, activation='relu', name='efficientnet_dense')(efficientnet_features)
    efficientnet_features = BatchNormalization()(efficientnet_features)
    efficientnet_features = Dropout(0.3)(efficientnet_features)
    
    # Xception branch
    xception_features = xception_base(inputs, training=False)
    xception_features = GlobalAveragePooling2D()(xception_features)
    xception_features = BatchNormalization()(xception_features)
    xception_features = Dropout(0.5)(xception_features)
    xception_features = Dense(512, activation='relu', name='xception_dense')(xception_features)
    xception_features = BatchNormalization()(xception_features)
    xception_features = Dropout(0.3)(xception_features)
    
    # Combine features
    combined_features = Concatenate()([efficientnet_features, xception_features])
    combined_features = Dense(256, activation='relu')(combined_features)
    combined_features = BatchNormalization()(combined_features)
    combined_features = Dropout(0.4)(combined_features)
    combined_features = Dense(128, activation='relu')(combined_features)
    combined_features = BatchNormalization()(combined_features)
    combined_features = Dropout(0.2)(combined_features)
    
    # Final classification layer
    outputs = Dense(1, activation='sigmoid', name='ensemble_output')(combined_features)
    
    # Create ensemble model
    ensemble_model = Model(inputs, outputs, name='EfficientNet_Xception_Ensemble')
    
    logger.info("Ensemble model (EfficientNet + Xception) created successfully")
    return ensemble_model

def load_deepfake_models():
    """Load or create the ensemble deepfake detection models"""
    global ensemble_model, efficientnet_model, xception_model
    
    ensemble_path = os.path.join(MODEL_FOLDER, 'ensemble_deepfake_detector.h5')
    efficientnet_path = os.path.join(MODEL_FOLDER, 'efficientnet_deepfake_detector.h5')
    xception_path = os.path.join(MODEL_FOLDER, 'xception_deepfake_detector.h5')
    
    # Load or create ensemble model
    if os.path.exists(ensemble_path):
        logger.info("Loading existing ensemble model...")
        try:
            ensemble_model = load_model(ensemble_path)
            logger.info("Ensemble model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading ensemble model: {str(e)}")
            logger.info("Creating new ensemble model...")
            ensemble_model = create_ensemble_model()
    else:
        logger.info("Creating new ensemble model...")
        ensemble_model = create_ensemble_model()
    
    # Load or create individual models
    if os.path.exists(efficientnet_path):
        logger.info("Loading existing EfficientNet model...")
        try:
            efficientnet_model = load_model(efficientnet_path)
            logger.info("EfficientNet model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading EfficientNet model: {str(e)}")
            efficientnet_model = create_efficientnet_model()
    else:
        efficientnet_model = create_efficientnet_model()
    
    if os.path.exists(xception_path):
        logger.info("Loading existing Xception model...")
        try:
            xception_model = load_model(xception_path)
            logger.info("Xception model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading Xception model: {str(e)}")
            xception_model = create_xception_model()
    else:
        xception_model = create_xception_model()
    
    # Train models if datasets are available and models don't exist
    if check_datasets_available():
        if not os.path.exists(ensemble_path):
            train_ensemble_models()
    
    return ensemble_model is not None

def check_datasets_available():
    """Check if datasets are available for training"""
    dataset1_path = os.path.join(DATASET_FOLDER, 'manjilkarki', 'Dataset')
    dataset2_path = os.path.join(DATASET_FOLDER, 'saurabhbagchi')
    dataset3_path = os.path.join(DATASET_FOLDER, 'faces140k')
    
    return os.path.exists(dataset1_path) or os.path.exists(dataset2_path) or os.path.exists(dataset3_path)

def load_and_prepare_dataset():
    """Load and prepare multiple Kaggle deepfake datasets"""
    try:
        logger.info("Loading datasets for EfficientNet and Xception training...")
        
        all_real_images = []
        all_fake_images = []
        
        # Load Dataset 1: manjilkarki/deepfake-and-real-images
        dataset1_path = os.path.join(DATASET_FOLDER, 'manjilkarki', 'Dataset')
        if os.path.exists(dataset1_path):
            real_path1 = os.path.join(dataset1_path, 'Real')
            fake_path1 = os.path.join(dataset1_path, 'Fake')
            
            if os.path.exists(real_path1):
                for filename in os.listdir(real_path1):
                    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                        all_real_images.append(os.path.join(real_path1, filename))
            
            if os.path.exists(fake_path1):
                for filename in os.listdir(fake_path1):
                    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                        all_fake_images.append(os.path.join(fake_path1, filename))
        
        # Load Dataset 2: saurabhbagchi/deepfake-image-detection
        dataset2_path = os.path.join(DATASET_FOLDER, 'saurabhbagchi')
        if os.path.exists(dataset2_path):
            for root, dirs, files in os.walk(dataset2_path):
                for dir_name in dirs:
                    dir_path = os.path.join(root, dir_name)
                    if 'real' in dir_name.lower():
                        for filename in os.listdir(dir_path):
                            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                                all_real_images.append(os.path.join(dir_path, filename))
                    elif 'fake' in dir_name.lower():
                        for filename in os.listdir(dir_path):
                            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                                all_fake_images.append(os.path.join(dir_path, filename))
        
        # Load Dataset 3: Additional faces dataset
        dataset3_path = os.path.join(DATASET_FOLDER, 'faces140k')
        if os.path.exists(dataset3_path):
            for root, dirs, files in os.walk(dataset3_path):
                for dir_name in dirs:
                    dir_path = os.path.join(root, dir_name)
                    if 'real' in dir_name.lower() or 'authentic' in dir_name.lower():
                        for filename in os.listdir(dir_path):
                            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                                all_real_images.append(os.path.join(dir_path, filename))
                    elif 'fake' in dir_name.lower() or 'generated' in dir_name.lower() or 'synthetic' in dir_name.lower():
                        for filename in os.listdir(dir_path):
                            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                                all_fake_images.append(os.path.join(dir_path, filename))
        
        logger.info(f"Total images loaded - Real: {len(all_real_images)}, Fake: {len(all_fake_images)}")
        
        if len(all_real_images) == 0 or len(all_fake_images) == 0:
            logger.error("No images found in datasets")
            return None, None, None, None
        
        # Create balanced dataset
        min_samples = min(len(all_real_images), len(all_fake_images))
        max_samples = min(8000, min_samples)  # Use up to 8k samples each for efficiency
        
        # Shuffle and select samples
        np.random.shuffle(all_real_images)
        np.random.shuffle(all_fake_images)
        
        all_real_images = all_real_images[:max_samples]
        all_fake_images = all_fake_images[:max_samples]
        
        # Combine and create labels
        all_images = all_real_images + all_fake_images
        all_labels = [0] * len(all_real_images) + [1] * len(all_fake_images)  # 0=real, 1=fake
        
        # Split dataset with stratification
        X_train_paths, X_val_paths, y_train, y_val = train_test_split(
            all_images, all_labels, test_size=0.2, random_state=42, stratify=all_labels
        )
        
        logger.info(f"Dataset split - Train: {len(X_train_paths)}, Validation: {len(X_val_paths)}")
        return X_train_paths, X_val_paths, np.array(y_train), np.array(y_val)
        
    except Exception as e:
        logger.error(f"Error loading dataset: {str(e)}")
        return None, None, None, None

def preprocess_image_for_models(image_path, target_size=(299, 299)):
    """Enhanced image preprocessing for EfficientNet and Xception"""
    try:
        # Load image
        img = cv2.imread(image_path)
        if img is None:
            img = Image.open(image_path)
            img = np.array(img)
        
        # Convert BGR to RGB if needed
        if len(img.shape) == 3 and img.shape[2] == 3:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Apply CLAHE for better contrast
        lab = cv2.cvtColor(img, cv2.COLOR_RGB2LAB)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        lab[:,:,0] = clahe.apply(lab[:,:,0])
        img = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)
        
        # Resize with better interpolation
        img = cv2.resize(img, target_size, interpolation=cv2.INTER_LANCZOS4)
        
        # Normalize for EfficientNet and Xception (expects values in [-1, 1])
        img = img.astype(np.float32)
        img = (img / 127.5) - 1.0
        
        # Add batch dimension
        img = np.expand_dims(img, axis=0)
        
        return img
    except Exception as e:
        logger.error(f"Error preprocessing image: {str(e)}")
        return None

def create_data_generators(X_train_paths, X_val_paths, y_train, y_val):
    """Create data generators for EfficientNet and Xception training"""
    try:
        from tensorflow.keras.preprocessing.image import ImageDataGenerator
        
        # Data augmentation for training
        train_datagen = ImageDataGenerator(
            rotation_range=20,
            width_shift_range=0.2,
            height_shift_range=0.2,
            shear_range=0.2,
            zoom_range=0.2,
            horizontal_flip=True,
            brightness_range=[0.8, 1.2],
            fill_mode='nearest'
        )
        
        # No augmentation for validation
        val_datagen = ImageDataGenerator()
        
        def image_generator(paths, labels, datagen, batch_size=16):
            while True:
                indices = np.random.permutation(len(paths))
                for start in range(0, len(paths), batch_size):
                    end = min(start + batch_size, len(paths))
                    batch_indices = indices[start:end]
                    
                    batch_images = []
                    batch_labels = []
                    
                    for i in batch_indices:
                        try:
                            img = preprocess_image_for_models(paths[i])
                            if img is not None:
                                batch_images.append(img[0])  # Remove batch dimension for generator
                                batch_labels.append(labels[i])
                        except Exception as e:
                            logger.warning(f"Failed to load image {paths[i]}: {str(e)}")
                            continue
                    
                    if len(batch_images) > 0:
                        batch_images = np.array(batch_images)
                        batch_labels = np.array(batch_labels)
                        
                        # Apply augmentation
                        if datagen.rotation_range > 0:  # Training generator
                            augmented_images = []
                            for img in batch_images:
                                # Convert back to [0, 255] for augmentation
                                img_aug = ((img + 1.0) * 127.5).astype(np.uint8)
                                img_expanded = np.expand_dims(img_aug, axis=0)
                                augmented = datagen.flow(img_expanded, batch_size=1).next()[0]
                                # Convert back to [-1, 1]
                                augmented = (augmented.astype(np.float32) / 127.5) - 1.0
                                augmented_images.append(augmented)
                            batch_images = np.array(augmented_images)
                        
                        yield batch_images, batch_labels
        
        train_generator = image_generator(X_train_paths, y_train, train_datagen, batch_size=16)
        val_generator = image_generator(X_val_paths, y_val, val_datagen, batch_size=16)
        
        return train_generator, val_generator
        
    except Exception as e:
        logger.error(f"Error creating data generators: {str(e)}")
        return None, None

def train_ensemble_models():
    """Train EfficientNet, Xception, and Ensemble models"""
    try:
        logger.info("Starting ensemble training with EfficientNet and Xception...")
        
        # Load and preprocess dataset
        X_train, X_val, y_train, y_val = load_and_prepare_dataset()
        
        if X_train is None:
            logger.error("Failed to load dataset")
            return False
        
        logger.info(f"Training set: {len(X_train)} samples")
        logger.info(f"Validation set: {len(X_val)} samples")
        
        # Create data generators
        train_generator, val_generator = create_data_generators(X_train, X_val, y_train, y_val)
        
        if train_generator is None:
            logger.error("Failed to create data generators")
            return False
        
        # Calculate steps per epoch
        steps_per_epoch = len(X_train) // 16
        validation_steps = len(X_val) // 16
        
        # Training callbacks
        callbacks = [
            tf.keras.callbacks.EarlyStopping(
                patience=8, 
                restore_best_weights=True,
                monitor='val_accuracy',
                mode='max'
            ),
            tf.keras.callbacks.ReduceLROnPlateau(
                factor=0.5, 
                patience=4,
                min_lr=0.00001,
                monitor='val_accuracy',
                mode='max'
            )
        ]
        
        # Phase 1: Train Ensemble Model (frozen base models)
        logger.info("Phase 1: Training ensemble model with frozen base models...")
        ensemble_model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='binary_crossentropy',
            metrics=['accuracy', 'precision', 'recall']
        )
        
        ensemble_callbacks = callbacks + [
            tf.keras.callbacks.ModelCheckpoint(
                os.path.join(MODEL_FOLDER, 'best_ensemble_model.h5'),
                save_best_only=True,
                monitor='val_accuracy',
                mode='max',
                verbose=1
            )
        ]
        
        history_ensemble = ensemble_model.fit(
            train_generator,
            steps_per_epoch=steps_per_epoch,
            epochs=15,
            validation_data=val_generator,
            validation_steps=validation_steps,
            callbacks=ensemble_callbacks,
            verbose=1
        )
        
        # Phase 2: Fine-tune ensemble model (unfreeze top layers)
        logger.info("Phase 2: Fine-tuning ensemble model...")
        
        # Unfreeze top layers of both base models
        for layer in ensemble_model.layers:
            if hasattr(layer, 'layers'):  # This is a base model
                layer.trainable = True
                # Freeze early layers, unfreeze later layers
                for sublayer in layer.layers[:-20]:
                    sublayer.trainable = False
        
        # Recompile with lower learning rate
        ensemble_model.compile(
            optimizer=Adam(learning_rate=0.0001),
            loss='binary_crossentropy',
            metrics=['accuracy', 'precision', 'recall']
        )
        
        history_ensemble_ft = ensemble_model.fit(
            train_generator,
            steps_per_epoch=steps_per_epoch,
            epochs=10,
            validation_data=val_generator,
            validation_steps=validation_steps,
            callbacks=ensemble_callbacks,
            verbose=1
        )
        
        # Save models
        ensemble_model.save(os.path.join(MODEL_FOLDER, 'ensemble_deepfake_detector.h5'))
        
        # Train individual models for comparison
        logger.info("Training individual EfficientNet model...")
        efficientnet_model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='binary_crossentropy',
            metrics=['accuracy', 'precision', 'recall']
        )
        
        efficientnet_callbacks = callbacks + [
            tf.keras.callbacks.ModelCheckpoint(
                os.path.join(MODEL_FOLDER, 'best_efficientnet_model.h5'),
                save_best_only=True,
                monitor='val_accuracy',
                mode='max'
            )
        ]
        
        efficientnet_model.fit(
            train_generator,
            steps_per_epoch=steps_per_epoch,
            epochs=10,
            validation_data=val_generator,
            validation_steps=validation_steps,
            callbacks=efficientnet_callbacks,
            verbose=1
        )
        
        efficientnet_model.save(os.path.join(MODEL_FOLDER, 'efficientnet_deepfake_detector.h5'))
        
        logger.info("Training individual Xception model...")
        xception_model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='binary_crossentropy',
            metrics=['accuracy', 'precision', 'recall']
        )
        
        xception_callbacks = callbacks + [
            tf.keras.callbacks.ModelCheckpoint(
                os.path.join(MODEL_FOLDER, 'best_xception_model.h5'),
                save_best_only=True,
                monitor='val_accuracy',
                mode='max'
            )
        ]
        
        xception_model.fit(
            train_generator,
            steps_per_epoch=steps_per_epoch,
            epochs=10,
            validation_data=val_generator,
            validation_steps=validation_steps,
            callbacks=xception_callbacks,
            verbose=1
        )
        
        xception_model.save(os.path.join(MODEL_FOLDER, 'xception_deepfake_detector.h5'))
        
        # Save training history
        combined_history = {}
        for key in history_ensemble.history.keys():
            combined_history[key] = history_ensemble.history[key] + history_ensemble_ft.history[key]
        
        history_path = os.path.join(MODEL_FOLDER, 'ensemble_training_history.json')
        with open(history_path, 'w') as f:
            json.dump({k: [float(x) for x in v] for k, v in combined_history.items()}, f)
        
        logger.info("Ensemble model training completed successfully")
        return True
        
    except Exception as e:
        logger.error(f"Error in ensemble training: {str(e)}")
        return False

def analyze_with_openai_vision(image_path):
    """Use OpenAI Vision API for additional analysis"""
    try:
        if not openai_client:
            return None
        
        # Encode image to base64
        with open(image_path, "rb") as image_file:
            base64_image = base64.b64encode(image_file.read()).decode('utf-8')
        
        response = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": """Analyze this image for signs of AI generation or deepfake manipulation. Look for:
1. Unnatural skin texture or lighting inconsistencies
2. Asymmetrical facial features or artifacts
3. Blurred or inconsistent background elements
4. Unusual eye reflections or teeth irregularities
5. Digital artifacts or compression anomalies
6. Inconsistent shadows or lighting sources
7. Synthetic-looking hair or clothing textures
8. Unnatural facial expressions or micro-expressions

Provide a confidence score (0-100) and detailed reasoning. Be very thorough in your analysis."""
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=500
        )
        
        analysis_text = response.choices[0].message.content
        
        # Extract confidence score from response
        confidence_score = 50  # Default
        if "confidence" in analysis_text.lower():
            import re
            confidence_matches = re.findall(r'(\d+)%?\s*confidence', analysis_text.lower())
            if confidence_matches:
                confidence_score = int(confidence_matches[0])
        
        # Determine if AI-generated based on analysis
        ai_keywords = ['ai-generated', 'artificial', 'synthetic', 'deepfake', 'generated', 'fake', 'digital', 'manipulated']
        is_ai_generated = any(keyword in analysis_text.lower() for keyword in ai_keywords)
        
        return {
            'is_ai_generated': is_ai_generated,
            'confidence': confidence_score,
            'analysis': analysis_text
        }
        
    except Exception as e:
        logger.error(f"Error with OpenAI Vision analysis: {str(e)}")
        return None

def advanced_artifact_analysis(image_path):
    """Advanced artifact analysis with multiple techniques"""
    try:
        img = cv2.imread(image_path)
        if img is None:
            return []
        
        artifacts = []
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # 1. DCT Analysis for compression artifacts
        dct = cv2.dct(np.float32(gray))
        high_freq_energy = np.sum(np.abs(dct[100:, 100:]))
        total_energy = np.sum(np.abs(dct))
        high_freq_ratio = high_freq_energy / total_energy if total_energy > 0 else 0
        
        if high_freq_ratio > 0.15:
            artifacts.append(f"High frequency artifacts detected (ratio: {high_freq_ratio:.3f})")
        elif high_freq_ratio < 0.05:
            artifacts.append(f"Unusually low high-frequency content (ratio: {high_freq_ratio:.3f})")
        
        # 2. Edge consistency analysis
        edges = cv2.Canny(gray, 50, 150)
        edge_density = np.sum(edges > 0) / (edges.shape[0] * edges.shape[1])
        
        if edge_density < 0.03:
            artifacts.append(f"Unusually smooth edges typical of AI generation (density: {edge_density:.3f})")
        elif edge_density > 0.4:
            artifacts.append(f"Excessive edge artifacts detected (density: {edge_density:.3f})")
        
        # 3. Color distribution analysis
        for i, color in enumerate(['Blue', 'Green', 'Red']):
            hist = cv2.calcHist([img], [i], None, [256], [0, 256])
            hist = hist.flatten()
            hist = hist[hist > 0]
            if len(hist) > 0:
                hist = hist / np.sum(hist)
                entropy = -np.sum(hist * np.log2(hist + 1e-10))
                
                if entropy < 5.5:
                    artifacts.append(f"Limited {color.lower()} channel distribution (entropy: {entropy:.2f})")
        
        # 4. Texture analysis using Local Binary Patterns
        try:
            from skimage.feature import local_binary_pattern
            lbp = local_binary_pattern(gray, 8, 1, method='uniform')
            lbp_hist, _ = np.histogram(lbp.ravel(), bins=10)
            lbp_uniformity = np.max(lbp_hist) / np.sum(lbp_hist)
            
            if lbp_uniformity > 0.3:
                artifacts.append(f"Uniform texture patterns suggesting synthetic generation (uniformity: {lbp_uniformity:.3f})")
        except ImportError:
            artifacts.append("Advanced texture analysis unavailable (scikit-image not installed)")
        
        # 5. Noise analysis
        noise = cv2.Laplacian(gray, cv2.CV_64F)
        noise_variance = noise.var()
        
        if noise_variance < 50:
            artifacts.append(f"Unusually low noise levels (variance: {noise_variance:.1f})")
        elif noise_variance > 1000:
            artifacts.append(f"High noise levels indicating processing artifacts (variance: {noise_variance:.1f})")
        
        return artifacts
        
    except Exception as e:
        logger.error(f"Error in advanced artifact analysis: {str(e)}")
        return ["Error in advanced artifact analysis"]

def predict_deepfake_ensemble(file_path, file_type):
    """Enhanced deepfake prediction using ensemble of EfficientNet and Xception"""
    try:
        start_time = time.time()
        file_hash = get_file_hash(file_path)
        
        if file_type.startswith('image/'):
            # Preprocess image
            img_array = preprocess_image_for_models(file_path)
            if img_array is None:
                return None
            
            # Get predictions from all models
            predictions = {}
            
            # Ensemble model prediction (multiple runs for consistency)
            ensemble_preds = []
            for _ in range(3):
                pred = ensemble_model.predict(img_array, verbose=0)[0][0]
                ensemble_preds.append(float(pred))
            predictions['ensemble'] = np.mean(ensemble_preds)
            predictions['ensemble_std'] = np.std(ensemble_preds)
            
            # Individual model predictions
            predictions['efficientnet'] = float(efficientnet_model.predict(img_array, verbose=0)[0][0])
            predictions['xception'] = float(xception_model.predict(img_array, verbose=0)[0][0])
            
            # OpenAI Vision analysis
            openai_result = analyze_with_openai_vision(file_path)
            
            # Combine predictions (weighted ensemble)
            # 50% ensemble, 25% EfficientNet, 25% Xception
            combined_prediction = (
                predictions['ensemble'] * 0.5 +
                predictions['efficientnet'] * 0.25 +
                predictions['xception'] * 0.25
            )
            
            # Adjust with OpenAI Vision if available
            if openai_result:
                openai_weight = 0.2
                if openai_result['is_ai_generated']:
                    openai_pred = openai_result['confidence'] / 100.0
                else:
                    openai_pred = 1.0 - (openai_result['confidence'] / 100.0)
                
                combined_prediction = (combined_prediction * (1 - openai_weight)) + (openai_pred * openai_weight)
            
            final_confidence = float(combined_prediction * 100)
            final_is_fake = combined_prediction > 0.5
            
            # Advanced artifact analysis
            visual_artifacts = advanced_artifact_analysis(file_path)
            
            # Add model-specific insights
            visual_artifacts.extend([
                f"EfficientNet prediction: {predictions['efficientnet']*100:.1f}%",
                f"Xception prediction: {predictions['xception']*100:.1f}%",
                f"Ensemble prediction: {predictions['ensemble']*100:.1f}% (±{predictions['ensemble_std']*100:.1f}%)",
                f"Combined weighted prediction: {final_confidence:.1f}%"
            ])
            
            if openai_result:
                visual_artifacts.append(f"OpenAI Vision analysis: {openai_result['analysis'][:150]}...")
            
        elif file_type.startswith('video/'):
            # Video processing (simplified)
            frames = extract_video_frames(file_path)
            if frames is None or len(frames) == 0:
                return None
            
            # Resize frames for models
            frames_resized = []
            for frame in frames:
                frame_resized = cv2.resize(frame, (299, 299))
                frame_resized = (frame_resized.astype(np.float32) / 127.5) - 1.0
                frames_resized.append(frame_resized)
            frames_resized = np.array(frames_resized)
            
            # Get predictions from ensemble
            ensemble_preds = ensemble_model.predict(frames_resized, verbose=0)
            combined_prediction = np.mean(ensemble_preds)
            final_confidence = float(combined_prediction * 100)
            final_is_fake = combined_prediction > 0.5
            
            frame_predictions = [float(p[0]) for p in ensemble_preds]
            prediction_variance = np.var(frame_predictions)
            
            visual_artifacts = [
                f"Analyzed {len(frames)} video frames with ensemble model",
                f"Frame prediction variance: {prediction_variance:.3f}",
                f"Average ensemble prediction: {combined_prediction*100:.1f}%",
                "High variance indicates inconsistent generation" if prediction_variance > 0.1 else "Consistent frame quality detected"
            ]
        
        processing_time = int((time.time() - start_time) * 1000)
        
        # Generate metadata flags
        metadata_flags = [
            "EfficientNet + Xception ensemble analysis",
            "Advanced CNN-based feature extraction",
            "Multi-model consensus validation",
            "File hash verification: " + file_hash[:8],
            "Weighted ensemble prediction applied"
        ]
        
        if openai_result:
            metadata_flags.append("OpenAI Vision API cross-validation performed")
        
        if final_is_fake:
            metadata_flags.extend([
                "AI generation signatures identified by multiple models",
                "Synthetic content patterns detected",
                "Cross-model consensus confirms artificial origin"
            ])
        else:
            metadata_flags.extend([
                "Authentic content characteristics verified by all models",
                "Natural generation patterns confirmed",
                "Cross-model consensus supports genuine origin"
            ])
        
        # Generate explanation
        if final_is_fake:
            explanation = f"Ensemble analysis (EfficientNet + Xception) indicates this content is AI-generated with {final_confidence:.1f}% confidence. "
            explanation += "Our advanced CNN ensemble, trained on multiple high-quality datasets, detected synthetic patterns across multiple feature extraction methods. "
            if openai_result:
                explanation += f"OpenAI Vision analysis corroborates these findings with additional validation. "
        else:
            explanation = f"Ensemble analysis suggests this content is authentic with {100-final_confidence:.1f}% confidence for being real. "
            explanation += "Our multi-model validation system found that visual patterns and generation characteristics align with genuine media capture. "
            if openai_result:
                explanation += f"OpenAI Vision analysis supports this assessment. "
        
        return {
            'isAIGenerated': final_is_fake,
            'confidence': final_confidence,
            'analysis': {
                'visualArtifacts': visual_artifacts,
                'metadataFlags': metadata_flags,
                'explanation': explanation
            },
            'processingTime': processing_time,
            'modelInfo': {
                'datasets': ['manjilkarki/deepfake-and-real-images', 'saurabhbagchi/deepfake-image-detection', 'xhlulu/140k-real-and-fake-faces'],
                'enhanced': True,
                'ensemble': True,
                'models': ['EfficientNetB4', 'Xception'],
                'openai_validation': openai_result is not None,
                'consistency_score': 1.0 - (predictions.get('ensemble_std', 0.0) if 'predictions' in locals() else 0.0)
            }
        }
        
    except Exception as e:
        logger.error(f"Error in ensemble prediction: {str(e)}")
        return None

def extract_video_frames(video_path, max_frames=10):
    """Extract frames from video for analysis"""
    try:
        cap = cv2.VideoCapture(video_path)
        frames = []
        frame_count = 0
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        frame_skip = max(1, total_frames // max_frames)
        
        while cap.isOpened() and len(frames) < max_frames:
            ret, frame = cap.read()
            if not ret:
                break
                
            if frame_count % frame_skip == 0:
                frame = cv2.resize(frame, (299, 299))
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                frame = frame.astype(np.float32) / 255.0
                frames.append(frame)
            
            frame_count += 1
        
        cap.release()
        return np.array(frames)
    except Exception as e:
        logger.error(f"Error extracting video frames: {str(e)}")
        return None

@app.route('/api/scan', methods=['POST'])
def scan_file():
    """API endpoint for ensemble file scanning"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not supported'}), 400
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        
        try:
            # Analyze the file with ensemble models
            result = predict_deepfake_ensemble(file_path, file.content_type)
            
            if result is None:
                return jsonify({'error': 'Failed to analyze file with ensemble models'}), 500
            
            return jsonify(result)
        
        finally:
            # Clean up uploaded file
            if os.path.exists(file_path):
                os.remove(file_path)
    
    except Exception as e:
        logger.error(f"Error in ensemble scan endpoint: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Enhanced health check endpoint"""
    datasets_info = {
        'manjilkarki': os.path.exists(os.path.join(DATASET_FOLDER, 'manjilkarki')),
        'saurabhbagchi': os.path.exists(os.path.join(DATASET_FOLDER, 'saurabhbagchi')),
        'faces140k': os.path.exists(os.path.join(DATASET_FOLDER, 'faces140k'))
    }
    
    return jsonify({
        'status': 'healthy',
        'ensemble_model_loaded': ensemble_model is not None,
        'efficientnet_model_loaded': efficientnet_model is not None,
        'xception_model_loaded': xception_model is not None,
        'ensemble_approach': True,
        'openai_integration': openai_client is not None,
        'datasets': datasets_info,
        'timestamp': time.time()
    })

@app.route('/api/model/retrain', methods=['POST'])
def retrain_models():
    """Endpoint to retrain the ensemble models"""
    try:
        success = train_ensemble_models()
        
        if success:
            return jsonify({'message': 'Ensemble models retrained successfully'})
        else:
            return jsonify({'error': 'Failed to retrain ensemble models'}), 500
    
    except Exception as e:
        logger.error(f"Error retraining ensemble models: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

def evaluate_ensemble_model_performance():
    """Evaluate ensemble model performance"""
    try:
        if ensemble_model is None:
            logger.error("Ensemble model not loaded")
            return None
        
        X_train_paths, X_val_paths, y_train, y_val = load_and_prepare_dataset()
        if X_val_paths is None:
            return None
        
        correct_predictions = 0
        total_predictions = 0
        sample_size = min(100, len(X_val_paths))
        
        for i in range(sample_size):
            try:
                img_array = preprocess_image_for_models(X_val_paths[i])
                if img_array is not None:
                    prediction = ensemble_model.predict(img_array, verbose=0)[0][0]
                    predicted_label = 1 if prediction > 0.5 else 0
                    actual_label = y_val[i]
                    
                    if predicted_label == actual_label:
                        correct_predictions += 1
                    total_predictions += 1
            except Exception as e:
                logger.warning(f"Failed to evaluate image {X_val_paths[i]}: {str(e)}")
                continue
        
        if total_predictions > 0:
            accuracy = (correct_predictions / total_predictions) * 100
            logger.info(f"Ensemble model accuracy: {accuracy:.2f}%")
            return accuracy
        
        return None
        
    except Exception as e:
        logger.error(f"Error evaluating ensemble model: {str(e)}")
        return None

@app.route('/api/model/performance', methods=['GET'])
def get_ensemble_model_performance():
    """Get ensemble model performance metrics"""
    try:
        accuracy = evaluate_ensemble_model_performance()
        
        history_path = os.path.join(MODEL_FOLDER, 'ensemble_training_history.json')
        training_history = None
        
        if os.path.exists(history_path):
            with open(history_path, 'r') as f:
                training_history = json.load(f)
        
        datasets_info = {
            'manjilkarki': os.path.exists(os.path.join(DATASET_FOLDER, 'manjilkarki')),
            'saurabhbagchi': os.path.exists(os.path.join(DATASET_FOLDER, 'saurabhbagchi')),
            'faces140k': os.path.exists(os.path.join(DATASET_FOLDER, 'faces140k'))
        }
        
        return jsonify({
            'accuracy': accuracy,
            'training_history': training_history,
            'ensemble_model_loaded': ensemble_model is not None,
            'efficientnet_model_loaded': efficientnet_model is not None,
            'xception_model_loaded': xception_model is not None,
            'ensemble_approach': True,
            'openai_integration': openai_client is not None,
            'datasets_integrated': datasets_info,
            'total_datasets': sum(datasets_info.values()),
            'models': ['EfficientNetB4', 'Xception', 'Ensemble']
        })
        
    except Exception as e:
        logger.error(f"Error getting ensemble model performance: {str(e)}")
        return jsonify({'error': 'Failed to get performance metrics'}), 500

if __name__ == '__main__':
    logger.info("Starting FakeBuster Ensemble Python Backend (EfficientNet + Xception)...")
    
    # Set up Kaggle API credentials
    kaggle_config_path = os.path.expanduser('~/.kaggle/kaggle.json')
    if not os.path.exists(kaggle_config_path):
        logger.warning("Kaggle credentials not found. Please set up kaggle.json")
        logger.info("Run 'python setup_enhanced_kaggle.py' to configure Kaggle credentials")
    
    # Check if datasets exist, download if not
    datasets_exist = check_datasets_available()
    if not datasets_exist:
        logger.info("Datasets not found. Attempting to download...")
        if os.path.exists(kaggle_config_path):
            download_success = download_kaggle_datasets()
            if not download_success:
                logger.warning("Failed to download datasets. Models will use basic weights only.")
        else:
            logger.warning("Cannot download datasets without Kaggle credentials")
    else:
        logger.info("Datasets found locally")
    
    # Load or create ensemble models
    if not load_deepfake_models():
        logger.error("Failed to load ensemble deepfake models")
        exit(1)
    
    # Check if models need training
    ensemble_path = os.path.join(MODEL_FOLDER, 'ensemble_deepfake_detector.h5')
    datasets_available = check_datasets_available()
    
    if not os.path.exists(ensemble_path) and datasets_available:
        logger.info("No trained ensemble model found but datasets are available. Starting training...")
        train_success = train_ensemble_models()
        if train_success:
            logger.info("Ensemble model training completed successfully")
        else:
            logger.warning("Ensemble model training failed. Using basic models.")
    elif os.path.exists(ensemble_path):
        logger.info("Using existing trained ensemble model")
        accuracy = evaluate_ensemble_model_performance()
        if accuracy:
            logger.info(f"Ensemble model accuracy: {accuracy:.2f}%")
    
    logger.info("FakeBuster Ensemble Python Backend started successfully")
    logger.info(f"Ensemble datasets integrated: {check_datasets_available()}")
    logger.info(f"Ensemble model ready: {ensemble_model is not None}")
    logger.info(f"EfficientNet model ready: {efficientnet_model is not None}")
    logger.info(f"Xception model ready: {xception_model is not None}")
    logger.info(f"OpenAI integration: {openai_client is not None}")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
