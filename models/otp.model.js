//otp.model.js
var mongoose = require('mongoose');

var length = 20;
function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
} // đơn giản đây là hàm tạo chuỗi random

var schemaOtp = new mongoose.Schema({
    email: String,
    otp: {
        type: String,
        default: generateRandomString
    },
    expireAt: {
        type: Date,
        expires: 180   // Thời gian tồn tại schema = exprireAt + expires (giây)
    }
});

module.exports = mongoose.model("otps", schemaOtp);