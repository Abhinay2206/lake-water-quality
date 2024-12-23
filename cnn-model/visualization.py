import numpy as np
import matplotlib.pyplot as plt
from layers import sigmoid

def plot_sample_images(X, y, num_samples=5):
    plt.figure(figsize=(10, 5))
    for i in range(num_samples):
        plt.subplot(1, num_samples, i + 1)
        plt.imshow(X[i])
        plt.title("Good" if y[i] == 1 else "Poor")
        plt.axis("off")
    plt.show()

def visualize_results(X_test, y_test, conv, pool, dense):
    fig, axes = plt.subplots(1, 4, figsize=(15, 4)) 
    axes = axes.ravel()

    for i in range(4):
        image = X_test[i]
        true_label = y_test[i]
        
        # Forward pass through the model
        out = conv.forward(image)
        out = pool.forward(out)
        out = out.flatten()
        out = dense.forward(out)
        pred = sigmoid(out)  # Predicted probability
        
        # Convert probability to class label (0 or 1)
        pred_label = 1 if pred >= 0.5 else 0
        
        # Debugging: Print true and predicted labels
        print(f"True Label: {true_label}, Predicted Probability: {pred}, Predicted Label: {pred_label}")
        
        # Reshape image to HWC format if necessary
        if image.shape[0] == 3:  # If the image is in (C, H, W) format
            image = image.transpose(1, 2, 0)
        
        # Show image
        axes[i].imshow(image)  # Show the image correctly
        axes[i].set_title(f"True: {true_label}, Pred: {pred_label}")
        axes[i].axis('off')
    
    plt.show()