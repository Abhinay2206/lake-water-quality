const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name: { type: String, required: true },
    image: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true }
    }
});

module.exports = mongoose.model('Image', ImageSchema);