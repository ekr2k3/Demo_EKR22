// account controller
// model account
// model role
// md5
var modelAccount = require("../../models/accounts.model");
var modelRole = require("../../models/roles.model");
var uploadsFunction = require('../../config/configUpload.js'); // import để dùng hàm upload tới cloud
const accountsModel = require("../../models/accounts.model");
var md5 = require('md5');

module.exports.getAccounts = async function (req, res) {
    var condition = {
        deleted: false,
    }
    var accounts = await modelAccount.find(condition);

    res.render('./server/pages/accounts/index.pug', {
        dataAcc: accounts
    });
}

module.exports.getCreateAccounts = async function (req, res) {
    // Cần có danh sách nhóm quyền để chọn
    option = {
        deleted: false,
    }
    var roles = await modelRole.find(option);
    res.render('./server/pages/accounts/create.pug', {
        dataRole: roles
    });
}

module.exports.postCreateAccounts = async function (req, res) {
    var myPromiseUpload = uploadsFunction(req.files.avata[0].buffer);
        myPromiseUpload
            .then(async (result) => {
                //avata nằm trong req.files chứ không nằm trong req.body
                // dùng md5 để mã hóa trước khi lưu lại
                var data = req.body;
                data.password = md5(data.password);
                data.avata = result.url;
                var acc = new accountsModel(data);
                await acc.save();
                res.redirect('/admin/accounts');
            });
}

module.exports.getUpdateAccounts = async function (req, res) {
    var id = req.params.id;
    console.log(id);
    var condition = {
        _id: id,   //đổi lại thành_id or id nếu không được
        deleted: false,
    }
    // Tài khoản cần sửa
    var account = await modelAccount.findOne(condition);
    console.log(account);
    // Cần có danh sách nhóm quyền để chọn 
    option = {
        deleted: false,
    }
    var roles = await modelRole.find(option);
    res.render('./server/pages/accounts/edit.pug', {
        dataAcc: account,
        dataRole: roles
    });
};

module.exports.patchEditAccounts = async function (req, res) {
    var id = req.params.id;
    var condition = {
        _id: id,   //Luôn là _id
        deleted: false,
    }
    if(req.files.avata){
        var myPromiseUpload = uploadsFunction(req.files.avata[0].buffer);
        myPromiseUpload
            .then(async (result) => {
                //avata nằm trong req.files chứ không nằm trong req.body
                // dùng md5 để mã hóa trước khi lưu lại
                var data = req.body;
                if(data.password){
                    data.password = md5(data.password);
                    console.log(data.password);
                }
                else{ // nếu không có điền password thì giữ nguyên password cũ
                    data.password = record[0].password;
                }
                data.avata = result.url;
                await modelAccount.updateOne(condition, data);
                res.redirect('/admin/accounts');
            });
    }
    else{
        var data = req.body;
        var record = await modelAccount.find({ _id: id });
        data.avata = record[0].avata;
        console.log("password" + data.password); // Chứng minh 1 ô input không điền
        // mà gửi vào server thì nó sẽ là "" tức rong data có thuộc tính password
        // ==> set lại giá trị password cũ cho nó
        if(data.password){ 
            data.password = md5(data.password);
        }
        else{ // nếu không có điền password thì giữ nguyên password cũ
            data.password = record[0].password;
            // Do nếu không set lại mật khẩu cũ thì data.password = ""
        }
        await modelAccount.updateOne(condition, data);
        res.redirect('/admin/accounts');
    }
}