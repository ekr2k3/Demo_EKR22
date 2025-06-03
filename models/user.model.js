//user.model.js
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


var schemaUser = new mongoose.Schema({
    email: String,
    password: String,
    deleted: {
        type: Boolean,
        default: false
    },
    fullname: String,
    phone: String,
    //role_id: String, // tài khoản bên client không cần
    status: {
        type: String,
        default: "active"
    }, // Dùng để khóa tài khoản có vấn đề
    avata: String,
    token_client: { // định danh người dùng
        type: String,
        default: generateRandomString // tạo token, mục đích random để tránh bị trùng nhau
    },
    myListFriend : [{
        idUser: String, // lưu lại token_client của người dùng khác
        id_room: String
    }],
    requestToMe : Array, // danh sách bạn bè có thể xét duyệt
    requestToOtherPepole : Array, // danh sách người dùng đang xét duyệt ta
});

module.exports = mongoose.model("users", schemaUser);