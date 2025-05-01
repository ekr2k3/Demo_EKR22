//chat.controller.js
var chatModel = require('../../models/chat.model');
var userModel = require('../../models/user.model');

module.exports.getChatList = async (req, res) => {
    var uploadCloudinary = require('../../config/configUpload');
    ioF.once('connection', (socket) => {
        //Đăng ký sự kiện chat message cho client đang kết lối thức object socket
        socket.on('chat message', async (msg) => {
            // upload từng ảnh lên cloudinary
            // và biến đổi msg.image thành đường dẫn ảnh đã upload thay vù base64
            for (let i = 0; i < msg.image.length; i++) {
                const image = msg.image[i];
                const buffer = Buffer.from(image, 'base64'); // Chuyển đổi base64 thành buffer
                const result = await uploadCloudinary(buffer); // Upload lên cloudinary
                console.log(result); // Kết quả trả về từ cloudinary
                msg.image[i] = result.secure_url; // Lưu lại đường dẫn ảnh đã upload
            }


            // Tạo document chat mới
            // Chú ý msg là đoạn tin nhắn từ client gửi lên
            var data = {
                user_id: res.locals.user[0].token_client, // do user là 1 mảng
            };
            if(msg.text.trim() != "") {
                data.content = msg.text; // Nếu có nội dung thì gán nội dung vào data
            }
            if (msg.image.length > 0) {
                data.imgage = msg.image; // Nếu có ảnh thì gán ảnh vào data
            }
            const chat = new chatModel(data);
            console.log(socket.id);
            await chat.save();
            console.log(chat);
            // Tiến hành phát sự kiện cho tất cả các client đang kết nối
            var objectChat = {
                user_id: res.locals.user[0].token_client, // lấy id của người nào đó gửi tin nhắn
                content: msg.text, // tin nhắn từ client nào đó gửi lên
                name: res.locals.user[0].fullname, // lấy tên của người nào đó gửi tin nhắn
                image: msg.image, // lấy ảnh từ client nào đó gửi lên
            };
            ioF.emit('server return', objectChat);
        });
        socket.on("typing", (flag) => {
            var objectTyping = {
                user_id: res.locals.user[0].token_client, // lấy id của người đang gõ
                name: res.locals.user[0].fullname, // lấy tên của người đang gõ
            };
            switch (flag) {
                case 'show':
                    socket.broadcast.emit('server typing', { name: res.locals.user[0].fullname, user_id: res.locals.user[0].token_client });
                    break;
                case 'hide':
                    socket.broadcast.emit('server drop typing', { name: res.locals.user[0].fullname, user_id: res.locals.user[0].token_client });
                    break;
            }
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