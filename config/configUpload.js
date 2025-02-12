var cloudinary = require('./cloudinary.js');

const option = {
    resource_type: 'auto',
};

const uploadToCloud = (buffer) => {
    console.log('Uploading to cloudinary');
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(option, (error, result) => {
            if (error) {
                console.error('Upload failed:', error);
                reject(error);
            } else {
                console.log('Upload successful:', result);
                resolve(result);
            }
        });
        uploadStream.end(buffer);
    });
};

module.exports = uploadToCloud;