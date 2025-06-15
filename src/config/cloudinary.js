const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary with your credentials
exports.connectCloudinary = () => {
    try {
        cloudinary.config({
            
            cloud_name: process.env.CLOUDE_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        console.log("Cloudinary connected successfully");
    } catch (error) {
        console.error("Cloudinary connection error:", error.message);
        process.exit(1);
    }
};