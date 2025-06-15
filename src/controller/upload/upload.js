const Image = require('../../models/upload/image');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Upload image to Cloudinary
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: '/entertainsphere_backend/src/uploads' // Optional folder in Cloudinary
        });

        

        // Save to database
        const newImage = new Image({
            public_id: result.public_id,
            url: result.secure_url
        });

        await newImage.save();

        // Delete file from local storage
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                public_id: result.public_id,
                url: result.secure_url
            }
        });
    } catch (error) {
        // Clean up: delete the file if something went wrong
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading image',
            error: error.message
        });
    }
};

// Get all images
exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: images.length,
            data: images
        });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching images',
            error: error.message
        });
    }
};

// Delete image
exports.deleteImage = async (req, res) => {
    try {
        const { public_id } = req.params;

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(public_id);

        // Delete from database
        await Image.findOneAndDelete({ public_id });

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting image',
            error: error.message
        });
    }
};