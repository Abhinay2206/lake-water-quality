require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require('./utils/db')
const AuthRoute = require("./routes/AuthRoute");
const ImageRoute = require("./routes/ImageRoute");
const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use('/api/auth', AuthRoute);
app.use('/api/image', ImageRoute);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});