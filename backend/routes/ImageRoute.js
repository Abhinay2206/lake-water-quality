const express = require("express");
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const { uploadImage, getImage } = require('../controllers/ImageController');

router.post("/upload", upload.single('image'), uploadImage);

router.get("/:email", getImage);

module.exports = router;