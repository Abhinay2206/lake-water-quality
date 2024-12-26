const fs = require('fs');
const multer = require('multer');
const Image = require('../models/Image');

const uploadImage = async (req, res) => {
    try {
        const { name } = req.body;
        const { path, mimetype } = req.file;

        if (!path) {
            return res.status(400).json({ message: 'Image data is required' });
        }

        const imageData = fs.readFileSync(path);

        const newImage = new Image({
            name,
            image: {
                data: imageData,
                contentType: mimetype
            }
        });

        await newImage.save();
        res.status(201).json({ message: 'File uploaded and saved successfully' });
    } catch (error) {
        if (error instanceof multer.MulterError) {
            console.error('MulterError:', error);
            res.status(400).json({ message: error.message });
        } else {
            console.error('Error uploading Image:', error);
            res.status(500).json({ message: 'Error uploading Image. Please try again.' });
        }
    }
}

const getImage = async (req, res) => {
    try {
        const { name } = req.params; 
        const image = await Image.findOne({ name }); 

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.set('Content-Type', image.image.contentType);
        res.send(image.image.data);
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ message: 'Error retrieving image. Please try again.' });
    }
}

module.exports = { uploadImage, getImage };
