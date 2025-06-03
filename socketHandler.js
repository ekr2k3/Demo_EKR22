//socketHandler.js

// Biến toàn cục lưu online users
const onlineUsers = new Map(); // key: token_client, value: socket.id


module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);

    // Toàn bộ sự kiện socket

    // Nhận sự kiện joinWeb
    socket.on('joinWeb', async ({ token }) => {
      if (!token) return;
      console.log(`✅ User online: ${token.token_client} with socket ID: ${socket.id}`);
      // Gán user vào Map online
      onlineUsers.set(token.token_client, socket.id);
      socket.token_client = token.token_client; // gán thêm thuộc tính cho object socket để disconnect xử lý được

      // Gửi danh sách online hiện tại cho user vừa vào
      io.emit('list-user-online', Array.from(onlineUsers.keys()));

      // Thông báo cho người khác biết user này online
      socket.broadcast.emit('user-online', token);
    });

    socket.on("disconnect", () => {
      const token = socket.token_client;
      if (token && onlineUsers.has(token)) {
        onlineUsers.delete(token);
        io.emit('user-offline', token); // Gửi cho toàn bộ client biết ai vừa offline
        console.log(`❌ User offline: ${token}`);
        // Gửi danh sách online hiện tại cho user vừa vào
        io.emit('list-user-online', Array.from(onlineUsers.keys()));
      }
    });
  });
};

/*
  khi user truy cập vào trang pug, html  nào đó có dùng socket thì sẽ tự động kết nối đến server socket
  Bằng cách client tạo 1 object socket với server socket --> mỗi khi vào 1 pug có dùng socket hoặc reload lại sẽ tạo ra 1 object socket mới
  ==> socket.id sẽ khác nhau Tuy cùng 1 tài khoản

  khi connect sẽ đăng ký 2 sự kiện joinWeb và disconnect

  disconnect sẽ kích hoạt khi user đóng tab, thoát trình duyệt, hoặc reload lại trang
  hàm disconnect sẽ xóa user khỏi danh sách onlineUsers
  Nếu sang 1 trang mới (1 page thuộc website) cũng sẽ tạo ra 1 object socket mới, và disconnect sẽ kích hoạt với object socket cũ --> xóa token_client khỏi onlineUsers
  <=> user sẽ không còn online nữa


  joinWeb sẽ kích hoạt khi user vào trang có dùng socket cụ thể là ở trang /home, và gửi token_client lên server để đăng ký online
  /home là trang khởi đầu của ứng dụng, nơi người dùng sẽ đăng nhập và sau đó được chuyển hướng đến trang chat hoặc các trang khác.
  --> Cho trang /home kích hoạt joinWeb là hợp lý vì đây là nơi người dùng sẽ đăng nhập và bắt đầu sử dụng ứng dụng.


*/


/*
  Giải quyết vấn đề disconnect 

  Khi user vào trang /home, sẽ tạo ra 1 object socket mới và đăng ký sự kiện joinWeb
  Khi user rời khỏi trang /home vô trang khác, sẽ kích hoạt sự kiện disconnect và xóa user khỏi danh sách onlineUsers <-> off
  Vậy để user vẫn được tính là online khi ở trang khác, ta cần đăng ký sự kiện joinWeb ở các trang khác
  Tức là ở trang khác ta vẫn phải gửi sự kiện joinWeb lên server để đăng ký online
  --> Ở mọi trang có dùng socket, ta đều đăng ký sự kiện joinWeb để đăng ký online (với cung token_client, socket.id khác nhau)

  cách trên là duy trì trạng thái online/offline của user bằng cách tái hiện lại sự kiện joinWeb ở các trang khác ngay khi disconnect
  Cách khác duy trì trạng thái online/offline của user là sử dụng trường statusUser trong schema user
  Chỉnh schema user có trường statusUser để lưu trạng thái online/offline
  Khi user Đăng nhập, sẽ cập nhật statusUser = online, khi user đăng xuất hoặc đóng tab sẽ cập nhật statusUser = offline
  Tuy nhiên cách này khi user đóng tab, thoát trình duyệt thì sẽ không cập nhật được statusUser vì không có sự kiện nào để xử lý
*/