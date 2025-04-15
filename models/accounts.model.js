//accounts.model.js
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


var schemaAccounts = new mongoose.Schema({
    email: String,
    password: String,
    deleted: {
        type: Boolean,
        default: false
    },
    fullname: String,
    phone: String,
    role_id: String, // id_của nhóm quyền (đây có thể coi là khóa ngoại của bảng này)
    status: String, // Dùng để khóa tài khoản có vấn đề
    avata: String,
    token: { // định danh người dùng
        type: String,
        default: generateRandomString // tạo token, mục đích random để tránh bị trùng nhau
    }
});

module.exports = mongoose.model("accounts", schemaAccounts);