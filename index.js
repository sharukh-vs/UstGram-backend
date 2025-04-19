const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const cloudinary = require("cloudinary");
require('dotenv').config();

const app = express();

cloudinary.v2.config({
    cloud_name: process.env.Cloudinary_Cloud_Name,
    api_key: process.env.Cloudinary_Api,
    api_secret: process.env.Cloudinary_Secret,
  });

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

connectDB();

app.use('/user', require('./routes/userRoutes'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})