import os
import numpy as np

from data_loader import prepare_dataset
from visualization import plot_sample_images, visualize_results
from train import train_model

def main():
    # Paths to the dataset
    good_quality_path = './data/lake-water-quality/Good_Quality'
    poor_quality_path = './data/lake-water-quality/Poor_Quality'

    # Prepare dataset
    X_train, X_test, y_train, y_test = prepare_dataset(good_quality_path, poor_quality_path)

    # Plot sample images
    plot_sample_images(X_train, y_train)

    # Train the model
    conv, pool, dense = train_model(X_train, y_train)

    # Visualize results on test set
    visualize_results(X_test, y_test, conv, pool, dense)

if __name__ == "__main__":
    main()