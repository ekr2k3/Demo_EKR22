// configMongoDB.js
var mongoose = require('mongoose'); //Đưa dữ liệu thư viện mongoose vào biến mongoose

var CON = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB); // Hàm connect để kết nối tới vị trị đặt database
        // Đại khái hàm connect sẽ thay đổi tham số gì đó của thư viện, dẫn tới project ta sẽ tham chiếu tới vị trị đặt database
        //vị trị đặt database (là 1 url) = URL tới server + '/' + Tên database
        console.log('success to connect mongoDB');
    } catch (error) {
        console.log(error);
    }
}
CON();
