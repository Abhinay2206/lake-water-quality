import os
from PIL import Image
from sklearn.model_selection import train_test_split
import torch

def prepare_dataset(good_folder, poor_folder, transform):
    good_images = [os.path.join(good_folder, f) for f in os.listdir(good_folder)]
    poor_images = [os.path.join(poor_folder, f) for f in os.listdir(poor_folder)]

    image_paths = good_images + poor_images
    labels = [1] * len(good_images) + [0] * len(poor_images)

    # Split data into train and validation sets
    train_paths, val_paths, train_labels, val_labels = train_test_split(
        image_paths, labels, test_size=0.2, random_state=42
    )

    # Dataset function implementation
    def dataset_function(image_paths, labels):
        images, targets = [], []
        for img_path, label in zip(image_paths, labels):
            image = Image.open(img_path)
            if transform:
                image = transform(image)
            images.append(image)
            targets.append(label)
        return images, torch.tensor(targets, dtype=torch.long)

    # Create training and validation datasets
    train_images, train_labels = dataset_function(train_paths, train_labels)
    val_images, val_labels = dataset_function(val_paths, val_labels)

    return train_images, train_labels, val_images, val_labels
