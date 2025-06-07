//room-chat.model.js

/*
    mongoose tuân theo module caching 
    --> cái require ở file này chỉ là trỏ tới vùng
    cache menory của mongoose
    --> Đã có đoạn connect mongoose trước đó rồi
    --> Ở đây không cần đoạn connect mongoose nữa
*/
var mongoose = require('mongoose');
ob = {
    name: String, // tên phòng chat
    avatar: String, // ảnh đại diện của phòng chat
    status: String, // trạng thái của phòng chat (ví dụ: active, inactive)
    user: [
        {
            user_id: String, // ID của người dùng
            role: String, // vai trò của người dùng trong phòng chat (ví dụ: admin, member)
        }
    ],
    typeofRoom: String, // loại phòng chat (ví dụ: private<2 người>, group, public)

    // có thể có thêm các trường khác tùy vào yêu cầu của ứng dụng

    deleted: {
        type: Boolean,
        default: false // mặc định là không bị xóa
    },
}
var Schema = mongoose.Schema; // import mongoose.Schema to create a schema
var roomchatSchema = new Schema(ob); // convert object to object schema
var roomchatSchema = mongoose.model('room-chats', roomchatSchema);
module.exports = roomchatSchema;