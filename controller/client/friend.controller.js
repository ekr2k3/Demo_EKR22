var userModel = require('../../models/user.model')
var roomChatModel = require('../../models/room-chat.model'); // Import model room-chat

module.exports.listuser = async (req, res) => {
    // Loại trừ bản thân người dùng
    var myToken = res.locals.user[0].token_client;
    // loại trừ những người đã kết bạn
    var myListFriend = res.locals.user[0].myListFriend; // 1 list các token của người khác
    // loại trừ những người tôi đã gửi lời mời kết bạn
    var requestToOtherPepole = res.locals.user[0].requestToOtherPepole; // 1 list các token của người khác
    // loại trừ những người đã gửi lời mời kết bạn tới tôi
    var requestToMe = res.locals.user[0].requestToMe; // 1 list các token của người khác

    var allUser = await userModel.find({});
    // Duyệt qua toàn bộ người dùng và đưa vào danh sách những record không có trong loại trừ
    var listUser = [];
    for (var i = 0; i < allUser.length; i++) {
        var token = allUser[i].token_client;
        if (token != myToken && !myListFriend.some(friend => friend.idUser === token) &&
            !requestToOtherPepole.some(user => user.token_client === token)
            && !requestToMe.some(user => user.token_client === token)) {
            listUser.push(allUser[i]);
        }
    }

    // socket
    ioF.once('connection', (socket) => {
        console.log('Kiểm tra kết nối socket');
        socket.on('sendFriendRequest', async (data) => {
            console.log('kiểm tra sự kiện Gửi lời mời kết bạn');
            var user = await userModel.findOne({ token_client: data.token }); // Tìm tới Người dùng khác
            if (user) {
                user.requestToMe.push({ token_client: myToken }); // Lưu lại token của mình vào danh sách người dùng khác
                await user.save();
            }

            var myUser = await userModel.findOne({ token_client: myToken }); // Tìm tới Người dùng mình
            if (myUser) {
                myUser.requestToOtherPepole.push({ token_client: data.token }); // Lưu lại token của người dùng khác vào danh sách của mình
                await myUser.save();
            }

            // server gửi số lượng requestToMe cho B sau khi A gửi lời mời kết bạn cho B
            var otherPeople = await userModel.findOne({ token_client: data.token });
            var num = otherPeople.requestToMe.length;
            socket.broadcast.emit('updateRequestToMeCount', {
                token: data.token, // token của người dùng khác
                count: num,
            });
            socket.broadcast.emit('updateReqToMe_of_other_pp', {
                token: data.token, // token của người dùng khác
                sendMyInfoToOtherPeople: myUser // Gửi thông tin của mình cho người khác
            });
            socket.broadcast.emit('removeOneReqToMe', {
                token: data.token, // token của người dùng khác
                sendMyInfoToOtherPeople: myUser // Gửi thông tin của mình cho người khác
            });
        });
        socket.on('cancelFriendRequest', async (data) => {
            console.log('kiểm tra sự kiện hủy Gửi lời mời kết bạn');
            var user = await userModel.findOne({ token_client: data.token }); // Tìm tới Người dùng khác
            if (user) {
                user.requestToMe = user.requestToMe.filter(friend => friend.token_client !== myToken); // Xóa token của mình khỏi danh sách người dùng khác
                await user.save();
            }

            var myUser = await userModel.findOne({ token_client: myToken }); // Tìm tới Người dùng mình
            if (myUser) {
                myUser.requestToOtherPepole = myUser.requestToOtherPepole.filter(user => user.token_client !== data.token); // Xóa token của người dùng khác khỏi danh sách của mình
                await myUser.save();
            }
            // server gửi số lượng requestToMe cho B sau khi A hủy gửi lời mời kết bạn cho B
            var otherPeople = await userModel.findOne({ token_client: data.token });
            var num = otherPeople.requestToMe.length;
            socket.broadcast.emit('updateRequestToMeCount', {
                token: data.token,
                count: num
            });
            socket.broadcast.emit('updateReqToMe_of_other_pp_Cancel', {
                token: data.token, // token của người dùng khác
                sendMyTokenToOtherPeople: myUser.token_client // Gửi thông tin của mình cho người khác
            });
            socket.broadcast.emit('addOneReqToMe', {
                token: data.token, // token của người dùng khác
                sendMyInfoToOtherPeople: myUser // Gửi thông tin của mình cho người khác
            });
        });
    });

    //end socket 



    // Đưa sang pug
    res.render('client/pages/friend/A.pug', {
        listUser: listUser,
    });
}


module.exports.listrequest = async (req, res) => {
    // Lấy token của người dùng hiện tại thông qua cookies
    var myToken = req.cookies.token_client;
    // Truy vấn tới bản ghi người dùng hiện tại
    var user = await userModel.findOne({ token_client: myToken });
    // Lấy danh sách yêu cầu kết bạn tới tôi
    var requestToMe = user.requestToMe; // Đây là danh sách các token_client của người dùng đã gửi lời mời kết bạn tới tôi

    console.log("My list request to me");
    console.log(requestToMe); // kiểm tra thử
    // Tìm kiếm record của các người dùng khác từ requestToMe
    // requestToMa là 1 mang chứa các (key-value) là (token_client: giá trị) của người dùng đã gửi lời mời kết bạn tới tôi
    // Cái này là lỗi của tôi ở trên do tôi lưu theo kiểu mỗi phần tử của mảng là 1 object chưa 1 cặp key-value
    // Cái này không phải lỗi lớn lắm tôi sẽ bỏ qua, nhưng đợt sau chú ý chỉ lưu mảng string thay vì mảng object
    // Ý là thay vì push({token: value}) thì chỉ cần push(value) là được
    // nhưng thôi không sao nó cx không ảnh hưởng lắm
    var MylistRequest = [];
    for (var i = 0; i < requestToMe.length; i++) {
        var user = await userModel.findOne({ token_client: requestToMe[i].token_client });
        if (user) {
            MylistRequest.push(user);
        }
    }

    // In để kiểm tra
    console.log("+++++++++++");
    console.log(MylistRequest);
    console.log("+++++++++++");
    // End Kiểm tra

    // socket
    ioF.once('connection', (socket) => {
        console.log('Kiểm tra kết nối socket');

        // Đăng ký sự kiện chapNhanRequestToMe
        /*
        Khi B đồng ý chấp nhận yêu cầu kết bạn của A: lúc này tài khoản hiện tại là B
            Thêm idA và id_Room_AB vào myListFriend của B
            Thêm idB và id_Room_AB vào myListFriend của A
            Xóa idA trong requestToMe của B
            xóa idB trong requestToOtherPepole  của A
        */

        socket.on('chapNhanRequestToMe', async (data) => {
            console.log('Đã kích hoạt thành công sự kiện chapNhanRequestToMe');
            console.log(data); // Kiểm tra dữ liệu nhận được


            var otherPeople = await userModel.findOne({ token_client: data.token }); // Tìm tới Người A
            var myUser = await userModel.findOne({ token_client: myToken }); // Tìm tới Người B (là người hiện tại)
            if (otherPeople && myUser) {
                // Tạo id_room mới
                var roomChat = new roomChatModel({
                    typeofRoom: "private", // Loại phòng chat là private (2 người)
                    status: "active", // Trạng thái phòng chat
                    user: [
                        { user_id: myToken, role: "admin" }, // Người B (là người hiện tại) với vai trò admin
                        { user_id: otherPeople.token_client, role: "admin" } // Người A với vai trò admin
                    ]
                }); // Tạo một instance mới của roomChatModel
                await roomChat.save(); // Lưu phòng chat mới vào cơ sở dữ liệu
                console.log("Phòng chat mới đã được tạo:", roomChat);
                var id_room = roomChat._id; // Lấy id của phòng chat mới tạo

                // Thêm vào myListFriend của B
                myUser.myListFriend.push({ idUser: otherPeople.token_client, id_room: id_room });
                await myUser.save();
                // Thêm vào myListFriend của A
                otherPeople.myListFriend.push({ idUser: myToken, id_room: id_room });
                await otherPeople.save();
                // Xóa idA trong requestToMe của B
                // Đưa các phần tử trong requestToMe B vào mảng mới trừ idA
                var temarray = [];
                for (var i = 0; i < myUser.requestToMe.length; i++) {
                    if (myUser.requestToMe[i].token_client !== otherPeople.token_client) {
                        temarray.push(myUser.requestToMe[i]);
                    }
                } // Mảng mới này sẽ không có idA
                myUser.requestToMe = temarray; // Gán lại mảng mới cho requestToMe của B
                // Lưu lại
                await myUser.save();
                //  xóa idB trong requestToOtherPepole  của A
                var temarray2 = [];
                for (var i = 0; i < otherPeople.requestToOtherPepole.length; i++) {
                    if (otherPeople.requestToOtherPepole[i].token_client !== myToken) {
                        temarray2.push(otherPeople.requestToOtherPepole[i]);
                    }
                } // Mảng mới này sẽ không có idB
                otherPeople.requestToOtherPepole = temarray2; // Gán lại mảng mới cho requestToOtherPepole của A
                // Lưu lại
                await otherPeople.save();
            }
            socket.broadcast.emit('hiddenAfter', {
                token: data.token, // token của người dùng khác
                sendMyInfoToOtherPeople: myUser // Gửi thông tin của mình cho người khác
            });
        });

        // Đăng ký sự kiện từ chối yêu cầu kết bạn tuChoiRequestToMe
        /*        Khi B từ chối yêu cầu kết bạn của A: lúc này tài khoản hiện tại là B
        Xóa idA trong requestToMe của B
        xóa idB trong requestToOtherPepole  của A
        */
        socket.on('tuChoiRequestToMe', async (data) => {
            console.log('Đã kích hoạt thành công sự kiện tuChoiRequestToMe');
            console.log(data); // Kiểm tra dữ liệu nhận được

            var otherPeople = await userModel.findOne({ token_client: data.token }); // Tìm tới Người A
            var myUser = await userModel.findOne({ token_client: myToken }); // Tìm tới Người B (là người hiện tại)
            if (otherPeople && myUser) {
                // Xóa idA trong requestToMe của B
                // Đưa các phần tử trong requestToMe B vào mảng mới trừ idA
                var temarray = [];
                for (var i = 0; i < myUser.requestToMe.length; i++) {
                    if (myUser.requestToMe[i].token_client !== otherPeople.token_client) {
                        temarray.push(myUser.requestToMe[i]);
                    }
                } // Mảng mới này sẽ không có idA
                myUser.requestToMe = temarray; // Gán lại mảng mới cho requestToMe của B
                // Lưu lại
                await myUser.save();
                //  xóa idB trong requestToOtherPepole  của A
                var temarray2 = [];
                for (var i = 0; i < otherPeople.requestToOtherPepole.length; i++) {
                    if (otherPeople.requestToOtherPepole[i].token_client !== myToken) {
                        temarray2.push(otherPeople.requestToOtherPepole[i]);
                    }
                } // Mảng mới này sẽ không có idB
                otherPeople.requestToOtherPepole = temarray2; // Gán lại mảng mới cho requestToOtherPepole của A
                // Lưu lại
                await otherPeople.save();
            }
        });
    });

    //end socket




    // Đưa sang pug
    res.render('client/pages/friend/C.pug', {
        MylistRequest: MylistRequest,
    });
}

module.exports.listSent = async (req, res) => {
    // Lấy token của người dùng hiện tại thông qua cookies
    var myToken = req.cookies.token_client;
    // Truy vấn tới bản ghi người dùng hiện tại
    var user = await userModel.findOne({ token_client: myToken });
    // Lấy danh sách yêu cầu kết bạn tới người khác của tôi
    var requestToOtherPepole = user.requestToOtherPepole;

    // In để kiểm tra
    console.log("+++++++++++");
    console.log(requestToOtherPepole);
    console.log("+++++++++++");


    // Tìm kiếm record của các người dùng khác từ requestToOtherPepole
    var MylistSent = [];
    for (var i = 0; i < requestToOtherPepole.length; i++) {
        var user = await userModel.findOne({ token_client: requestToOtherPepole[i].token_client });
        if (user) {
            MylistSent.push(user);
        }
    }
    // In để kiểm tra
    console.log("+++++++++++");
    console.log(MylistSent);
    console.log("+++++++++++");


    // đoạn socket copy y hệt ở controller trang A
    ioF.once('connection', (socket) => {
        console.log('Kiểm tra kết nối socket');
        socket.on('sendFriendRequest', async (data) => {
            console.log('kiểm tra sự kiện Gửi lời mời kết bạn');
            var user = await userModel.findOne({ token_client: data.token }); // Tìm tới Người dùng khác
            if (user) {
                user.requestToMe.push({ token_client: myToken }); // Lưu lại token của mình vào danh sách người dùng khác
                await user.save();
            }

            var myUser = await userModel.findOne({ token_client: myToken }); // Tìm tới Người dùng mình
            if (myUser) {
                myUser.requestToOtherPepole.push({ token_client: data.token }); // Lưu lại token của người dùng khác vào danh sách của mình
                await myUser.save();
            }
        });
        socket.on('cancelFriendRequest', async (data) => {
            console.log('kiểm tra sự kiện hủy Gửi lời mời kết bạn');
            var user = await userModel.findOne({ token_client: data.token }); // Tìm tới Người dùng khác
            if (user) {
                user.requestToMe = user.requestToMe.filter(friend => friend.token_client !== myToken); // Xóa token của mình khỏi danh sách người dùng khác
                await user.save();
            }

            var myUser = await userModel.findOne({ token_client: myToken }); // Tìm tới Người dùng mình
            if (myUser) {
                myUser.requestToOtherPepole = myUser.requestToOtherPepole.filter(user => user.token_client !== data.token); // Xóa token của người dùng khác khỏi danh sách của mình
                await myUser.save();
            }
        });
    });
    // end socket
    res.render('client/pages/friend/D.pug', {
        MylistSent: MylistSent,
    });
}

module.exports.listfriend = async (req, res) => {
    // Lấy token của người dùng hiện tại thông qua cookies (Chính là tôi người đang đăng nhập)
    var myToken = req.cookies.token_client;
    // Truy vấn tới bản ghi của tôi
    var user = await userModel.findOne({ token_client: myToken });
    // Lấy danh sách bạn bè của tôi
    var myListFriend = user.myListFriend;

    // In để kiểm tra
    console.log("+++++++++++");
    console.log(myListFriend);
    console.log("+++++++++++");

    // Tìm kiếm record của các người dùng khác từ myListFriend
    var MylistFriend = [];
    for (var i = 0; i < myListFriend.length; i++) {
        var user = await userModel.findOne({ token_client: myListFriend[i].idUser });
        if (user) {
            MylistFriend.push(user);
        }
    }
    // Gán id phòng chat riêng mình và người khác vào từng người dùng trong MylistFriend
    for(var i = 0; i< MylistFriend.length; i++) {
        MylistFriend[i].roomID = myListFriend[i].id_room; // roomID là attribute được thêm vào từng người dùng trong MylistFriend
        // Gán id phòng chat riêng của mình và người khác vào từng người dùng trong MylistFriend
    }
    // Đưa sang pug
    res.render('client/pages/friend/B.pug', {
        MylistFriend: MylistFriend,
    });
}