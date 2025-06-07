//chat.controller.js
var chatModel = require('../../models/chat.model');
var userModel = require('../../models/user.model');

module.exports.getChatList = async (req, res) => {
    var uploadCloudinary = require('../../config/configUpload');
    ioF.once('connection', (socket) => {
        socket.join(req.params.id_room); // Kết nối socket với id phòng chat
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
            data.room_id = req.params.id_room; // Lấy id phòng từ params
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
            ioF.to(req.params.id_room).emit('server return', objectChat);
        });
        socket.on("typing", (flag) => {
            var objectTyping = {
                user_id: res.locals.user[0].token_client, // lấy id của người đang gõ
                name: res.locals.user[0].fullname, // lấy tên của người đang gõ
            };
            switch (flag) {
                case 'show':
                    socket.to(req.params.id_room).emit('server typing', { name: res.locals.user[0].fullname, user_id: res.locals.user[0].token_client });
                    break;
                case 'hide':
                    socket.to(req.params.id_room).emit('server drop typing', { name: res.locals.user[0].fullname, user_id: res.locals.user[0].token_client });
                    break;
            }
        });
    });

    // Lấy danh sách chat từ database
    var chatList = await chatModel.find({
        room_id: req.params.id_room // Lấy chat theo id phòng
    });
    // Lấy danh sách người dùng từ database
    var userList = await userModel.find({});
    
    var temp = [];
    for(let i = 0; i < userList.length; i++) {
        for(let j = 0; j < userList[i].myListFriend.length; j++) {
            // console.log(userList[i].myListFriend[j].id_room + " == " + req.params.id_room);
            if(userList[i].myListFriend[j].id_room == req.params.id_room) {
                console.log("hello" + i);
                temp.push(userList[i]);
                break; // Nếu đã tìm thấy id_room thì không cần kiểm tra tiếp
            }
        }
    };
    userList = temp; // Lọc danh sách người dùng theo id phòng
    // console.log("form chat.controller.js");
    // console.log(chatList);
    // console.log(userList);
    res.render('client/pages/chat/index.pug', {
        chatList: chatList,
        userList: userList
    });
}