//chat.model.js
var mongoose = require('mongoose');
ob = {
    user_id: String, // để biết ai là người gửi tin nhắn
    room_id: String, // để biết tin nhắn này thuộc phòng nào
    content: String, // nội dung tin nhắn
    imgage: String, // hình ảnh đính kèm
    time: { // thời gian gửi tin nhắn
        type: Date,
        default: Date.now
    },
    deleted: { // để biết tin nhắn này đã bị xóa hay chưa
        type: Boolean,
        default: false
    }
};
var sChema = mongoose.Schema; // trỏ tới constructor schema
var schemaChat = new sChema(ob)
module.exports = mongoose.model('chats', schemaChat);