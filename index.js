﻿//index.js
var ex = require('express');
require("dotenv").config();
require('./config/configMongoDB')
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
//Khởi tạo ứng dựng
var app = ex();
app.use(cookieParser("anystring")); // Nhập chuỗi bất kỳ
app.use(session({
    cookie: { maxAge: 60000 }, // cho phép session id tồn tại 1 phút trong cookie
}));
app.use(flash());
var methodOverride = require('method-override');
app.use(ex.urlencoded({ extended: true })); // phải có cái này server mới nhận được đủ data từ form ?
app.use(methodOverride('_method'));
// module.exports = app;
//set up pug cho ứng dụng
app.set('view engine', 'pug');
app.set('views', 'D:/EKR22/view');
app.use('/', ex.static('./public'));
var allRouter = require('./routers/sumaryRouter');
allRouter(app);
app.get('/', (req, res) => {
    res.send(__dirname + "  " + process.cwd());
});

app.listen(3000,()=>{
    console.log('run at 3000');
    console.log('at index.js-'+process.env.A + process.env.B);
});