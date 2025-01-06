import io
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from torchvision import transforms
from PIL import Image
from model import CNN

app = Flask(__name__)
CORS(app) 

# Load the model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = CNN().to(device)

try:
    model.load_state_dict(torch.load('satellite_classifier.pth'))
    model.eval()
except FileNotFoundError:
    print("Model file 'satellite_classifier.pth' not found.")

# Define image transformations
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    # Get the image from the request
    image = request.files['image'].read()
    image = Image.open(io.BytesIO(image))
    
    # Transform image
    image = transform(image).unsqueeze(0).to(device)

    # Make prediction
    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)

    return jsonify({'prediction': predicted.item()})

if __name__ == '__main__':
    app.run(debug=True)
