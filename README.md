# Lake Water Quality Estimation System

A deep learning-based system that uses CNN to analyze satellite imagery for estimating lake water quality. The system provides binary classification (good/bad) of water quality to aid environmental monitoring and decision-making.

## Features

- CNN-based water quality classification
- User-friendly web interface for image upload
- Visualization of prediction results
- Secure storage of images and analysis results
- Built with MERN stack and Flask

## Tech Stack

- **Frontend:** React.js with Tailwind CSS
- **Backend:** Node.js, Express.js, Flask
- **Database:** MongoDB
- **ML Framework:** CNN (Convolutional Neural Network)
- **Deployment:** AWS/Heroku 

## System Requirements

### Software Requirements
- Windows/Linux/MacOS
- Node.js
- Python 3.x
- MongoDB

### Hardware Requirements
- Processor: Intel i5 or equivalent
- RAM: 8GB minimum
- Storage: 20GB free space
- GPU: Optional but recommended for model training

## Installation

1. Clone the repository
```bash
git clone https://github.com/Abhinay2206/lake-water-quality
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Set up python environment 
```bash
# Create .env file in backend directory
cd cnn-pytorch
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

5. Start the servers
```bash
# Start backend server
cd backend
npm start

# Start Flask server
cd cnn-pytorch
python app.py

# Start frontend development server
cd frontend
npm start
```

## Project Structure

```
├── frontend/               # React frontend
├── backend/               # Node.js & Express backend        
├── cnn-pytorch/           # Trained ML models
└── data/               # Dataset storage
```

## Features and Functionality

### Image Upload
- Supports satellite image uploads
- Automatic preprocessing of uploaded images

### Model Processing
- CNN-based feature extraction
- Binary classification (good/bad water quality)
- Minimum 75% classification accuracy

### Visualization
- Display of prediction results
- Basic result visualization

## API Endpoints

- `POST /api/upload` - Upload satellite images
- `GET /api/predict` - Get prediction results
- `GET /api/history` - View prediction history

## Security

- Basic authentication system
- Secure image storage
- Limited access controls

## Performance

- Processing time: <10 seconds per image
- Accuracy: >75% classification accuracy
- Scalable architecture for future enhancements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
