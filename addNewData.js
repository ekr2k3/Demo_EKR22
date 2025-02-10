// addNewData.js
require('dotenv').config();
require('./config/configMongoDB');
var Anh = "https://cafefcdn.com/zoom/600_315/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg";

var modelPhone = require('./models/itemPhone');

var removeAll = async ()=>{
    var condition = {

    };
    var result = await modelPhone.deleteMany(condition);
    console.log(result);
}

var addData = async (ob)=>{
    var document = new modelPhone(ob);
    await document.save();
}
ob1 = {
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "stock": 94,
    "thumbnail": Anh,
    "status": "active",
    "position": 1,
    "deleted": false
};
ob2 = {
    "title": "iPhone X",
    "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    "price": 899,
    "discountPercentage": 17.94,
    "stock": 34,
    "thumbnail": Anh,
    "status": "active",
    "position": 2,
    "deleted": false
};
ob3 = {
    "title": "Samsung Universe 9",
    "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
    "price": 1249,
    "discountPercentage": 15.46,
    "stock": 36,
    "thumbnail": Anh,
    "status": "inactive",
    "position": 3,
    "deleted": false
};
ob4 = {
    "title": "OPPOF19",
    "description": "OPPO F19 is officially announced on April 2021.",
    "price": 280,
    "discountPercentage": 17.91,
    "stock": 123,
    "thumbnail": Anh,
    "status": "active",
    "position": 4,
    "deleted": false
};
ob5 = {
    "title": "Huawei P30",
    "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    "price": 499,
    "discountPercentage": 10.58,
    "stock": 32,
    "thumbnail": Anh,
    "status": "inactive",
    "position": 5,
    "deleted": false
};
ob6 = {
    "title": "MacBook Pro",
    "description": "MacBook Pro 2021 with mini-LED display may launch between September, November",
    "price": 1749,
    "discountPercentage": 11.02,
    "stock": 83,
    "thumbnail": Anh,
    "status": "active",
    "position": 6,
    "deleted": true
};
// Hàm thực thi tuần tự
(async () => {
    await removeAll(); // Đợi xóa xong
    await addData(ob1); // Lần lượt thêm từng dữ liệu
    await addData(ob2);
    await addData(ob3);
    await addData(ob4);
    await addData(ob5);
    await addData(ob6);
    await addData(ob1); // Lần lượt thêm từng dữ liệu
    await addData(ob2);
    await addData(ob3);
    await addData(ob4);
    await addData(ob5);
    await addData(ob6);
    await addData(ob1); // Lần lượt thêm từng dữ liệu
    await addData(ob2);
    await addData(ob3);
    await addData(ob4);
    await addData(ob5);
    await addData(ob6);
    await addData(ob1); // Lần lượt thêm từng dữ liệu
    await addData(ob2);
    await addData(ob3);
    await addData(ob4);
    await addData(ob5);
    await addData(ob6);
    await addData(ob1); // Lần lượt thêm từng dữ liệu
    await addData(ob2);
    await addData(ob3);
})();
