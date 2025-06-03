// query.js
require('dotenv').config();
require('./config/configMongoDB');

// import các model cần thiết
var modelUser = require('./models/user.model.js');


// Truy vấn dùng để cập nhập lại list friend của user tó token_client = BuDItwOSpoI1lTxFdFF9
async function query1() {
    try {
        var user = await modelUser.findOne({ token_client: "BuDItwOSpoI1lTxFdFF9" });
        if (user) {
            // Lấy danh sách bạn bè từ myListFriend
            var listFriend = user.myListFriend;
            console.log("Danh sách bạn bè:", listFriend);

            // Cập nhật lại danh sách bạn bè cho người dùng
            user.myListFriend = [];
            await user.save(); // Lưu thay đổi vào cơ sở dữ liệu
            console.log("Cập nhật danh sách bạn bè thành công.");
        } else {
            console.log("Không tìm thấy người dùng với token_client đã cho.");
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn:", error);
    }
}


// Thực hiện truy vấn
query1()
    .then(() => {
        console.log("Truy vấn hoàn tất.");
        process.exit(0); // Kết thúc quá trình Node.js
    })
    .catch((error) => {
        console.error("Lỗi trong quá trình truy vấn:", error);
        process.exit(1); // Kết thúc quá trình Node.js với mã lỗi
    });
