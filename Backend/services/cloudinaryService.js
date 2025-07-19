const cloudinary = require('cloudinary').v2;
const {CloudinaryError} = require('../errors');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localfilePath) => {
    try {
        if(!localfilePath) return null;
        const result = await cloudinary.uploader.upload(localfilePath,{
            resource_type: 'auto',
        });
        return result;
    } catch (error) {
        throw new CloudinaryError('Error uploading to Cloudinary');
    }
}

module.exports = uploadToCloudinary;