import os
import numpy as np
import cv2
from sklearn.model_selection import train_test_split

# Image size and parameters
IMG_SIZE = (128, 128)

def load_images_from_folder(folder, label):
    images = []
    labels = []
    for filename in os.listdir(folder):
        img_path = os.path.join(folder, filename)
        img = cv2.imread(img_path)  # Read image
        if img is not None:
            img = cv2.resize(img, IMG_SIZE)  # Resize image
            images.append(img)
            labels.append(label)
    return np.array(images), np.array(labels)

def prepare_dataset(good_quality_path, poor_quality_path):
    # Load images from both folders
    good_images, good_labels = load_images_from_folder(good_quality_path, 1)  # Label 1 for good quality
    poor_images, poor_labels = load_images_from_folder(poor_quality_path, 0)  # Label 0 for poor quality

    # Combine and shuffle the dataset
    X = np.concatenate((good_images, poor_images), axis=0)
    y = np.concatenate((good_labels, poor_labels), axis=0)

    # Normalize pixel values to [0, 1]
    X = X.astype('float32') / 255.0

    # Split into training and validation sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    # Reshape labels 
    y_train = y_train.reshape(-1, 1)
    y_test = y_test.reshape(-1, 1)

    return X_train, X_test, y_train, y_test