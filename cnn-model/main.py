from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import os
from data_loader import prepare_dataset
from train import train_model
from visualization import predict

app = Flask(__name__)
CORS(app) 

good_quality_path = './data/lake-water-quality/good'
poor_quality_path = './data/lake-water-quality/poor'

X_train, X_test, y_train, y_test = prepare_dataset(good_quality_path, poor_quality_path)
conv, pool, dense = train_model(X_train, y_train)

@app.route('/predict', methods=['POST'])
def predict_quality():
    try:
        file = request.files['image']
        if not file:
            return jsonify({'error': 'No image file provided'}), 400

        img = preprocess_image(file)

        if img.ndim != 3: 
            return jsonify({"error": "Image must be a 3D array"}), 400

        prediction = predict(img, conv, pool, dense)  

        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def preprocess_image(image_file):
    from PIL import Image
    img = Image.open(image_file).convert('RGB')  
    img = img.resize((128, 128))  
    img_array = np.array(img) / 255.0 
    if img_array.ndim != 3:  
        raise ValueError("Image must have 3 dimensions (height, width, channels)")
    return img_array


if __name__ == "__main__":
    app.run(debug=True)
