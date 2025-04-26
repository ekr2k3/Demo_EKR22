//chat.controller.js
var chatModel = require('../../models/chat.model');
var userModel = require('../../models/user.model');
module.exports.getChatList = async (req, res) => {
    ioF.once('connection', (socket) => {
        //Đăng ký sự kiện chat message cho client đang kết lối thức object socket
        socket.on('chat message', async (msg) => {
            // Tạo document chat mới
            // Chú ý msg là đoạn tin nhắn từ client gửi lên
            var data = {
                user_id: res.locals.user[0].token_client, // do user là 1 mảng
                content: msg
            };
            const chat = new chatModel(data);
            console.log(socket.id);
            await chat.save();

            // Tiến hành phát sự kiện cho tất cả các client đang kết nối
            var objectChat = {
                user_id: res.locals.user[0].token_client, // lấy id của người nào đó gửi tin nhắn
                content: msg, // tin nhắn từ client nào đó gửi lên
                name: res.locals.user[0].fullname, // lấy tên của người nào đó gửi tin nhắn
            };
            ioF.emit('server return', objectChat);
        });
    });

    // Lấy danh sách chat từ database
    var chatList = await chatModel.find({});
    // Lấy danh sách người dùng từ database
    var userList = await userModel.find({});
    res.render('client/pages/chat/index.pug', {
        chatList: chatList,
        userList: userList
    });
}