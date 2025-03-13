// productController.js 
const { connection } = require('mongoose');
var uploadsFunction = require('../../config/configUpload.js');
var modelP = require('../../models/itemPhone.js');
var typeModel = require('../../models/types.model.js');
var sortData = (req, data) => {
    var typeSort = req.query.typeSort;
    var valueSort = req.query.valueSort;
    switch (typeSort) {
        case 'position':
            if (valueSort == 'asc') {
                data.sort((a, b) => {
                    return a.position - b.position;
                });
            }
            else {
                data.sort((a, b) => {
                    return b.position - a.position;
                });
            }
            break;
        case 'price':
            if (valueSort == 'asc') {
                data.sort((a, b) => {
                    return a.price - b.price;
                });
            }
            else {
                data.sort((a, b) => {
                    return b.price - a.price;
                });
            }
            break;
        case 'title':
            function compareAlphabet(str1, str2) {
                const len = Math.min(str1.length, str2.length);

                for (let i = 0; i < len; i++) {
                    if (str1[i] < str2[i]) return -1;
                    if (str1[i] > str2[i]) return 1;
                }

                if (str1.length < str2.length) return -1;
                if (str1.length > str2.length) return 1;

                return 0;
            }
            // bubble sort
            for (let i = 0; i < data.length - 1; i++) {
                for (let j = i + 1; j < data.length; j++) {
                    if (compareAlphabet(data[i].title, data[j].title) > 0) {
                        const temp = data[i];
                        data[i] = data[j];
                        data[j] = temp;
                    }
                }
            }
    }
    return data;
}
module.exports.getProduct = async (req, res) => {
    var condition = {};
    condition.deleted = false;
    var input1 = ['', '', ''];
    var input2 = ['', 'active', 'inactive'];
    var input3 = ['all', 'active', 'inactive'];
    if (req.query.status) {
        condition.status = req.query.status;
    }
    if (condition.status == 'active') {
        input1 = ['B', 'A', 'B'];
    }
    else if (condition.status == 'inactive') {
        input1 = ['B', 'B', 'A'];
    }
    else if (condition.status == "" || condition.status == undefined) {
        input1 = ['A', 'B', 'B'];
    }

    if (req.query.title) {
        var info = req.query.title;
        condition.title = new RegExp(info, 'i'); // i: không phân biệt hoa thường
    }

    var DATA = await modelP.find(condition);
    var newData = [];
    var elementPerPage = 6;
    var currentPage = 0; // default
    var totalPage = 0;
    if (DATA.length % elementPerPage > 0) {
        totalPage = Math.ceil(DATA.length / elementPerPage); //làm tròn lên
        console.log(totalPage);
    }
    else {
        totalPage = DATA.length / elementPerPage;
    }
    if (req.query.index) {
        currentPage = req.query.index;
    }
    var step = elementPerPage * currentPage;
    for (var i = 0 + step; i < elementPerPage + step; i++) {
        if (i >= DATA.length) {
            break;
        }
        newData.push(DATA[i]);
    }
    DATA = newData;
    DATA = sortData(req, DATA);
    res.render('./server/pages/product/index.pug', {
        to: DATA,
        input1: input1,
        input2: input2,
        input3: input3,
        info: info,
        totalPage: totalPage - 1, // Do index bắt đầu từ 0
        current: currentPage
    })
}

module.exports.changeStatus = async (req, res) => {
    var condition = {}
    condition._id = req.params.id; //Chú ý dùng _id chứ không phải id
    var status = req.params.status;
    var data = await modelP.find(condition);
    console.log(data);
    console.log(condition.id);
    if (data[0]) {
        data[0].status = status;
        await data[0].save();
    }
    else {
        req.flash('error', 'Không tìm thấy sản phẩm');
    }
    req.flash('success', 'Thay đổi trạng thái thành công');
    res.redirect('/admin/product');
}

module.exports.changeMany = async (req, res) => {
    var ids = req.body.ids.split(';');
    var option = req.body.option;
    switch (option) {
        case "active":
            for (let i = 0; i < ids.length; i++) {
                // Cập nhật cần có $set nha
                await modelP.updateOne({ _id: ids[i] }, { $set: { status: "active" } });
            }
            break;
        case "inactive":
            for (let i = 0; i < ids.length; i++) {
                // Cập nhật cần có $set nha
                await modelP.updateOne({ _id: ids[i] }, { $set: { status: "inactive" } });
            }
            break;
        case "delete":
            for (let i = 0; i < ids.length; i++) {
                await modelP.updateOne(
                    { _id: ids[i] },
                    { $set: { deleted: true } });
            }
            break;
        case "position":
            for (let i = 0; i < ids.length; i++) {
                var a = ids[i].split('-');
                await modelP.updateOne(
                    { _id: a[0] },
                    { $set: { position: a[1] } });
            }
    }
    res.redirect('/admin/product');
}

module.exports.delete_data = async (req, res) => {
    var id_r = req.params.id;
    condition = {};
    condition._id = id_r; // Chú ý dùng _id là string còn id là object
    try {
        await modelP.deleteOne(condition);
    } catch (error) {
        console.log(error);
    }
    res.redirect('/admin/product');
}

module.exports.delete_p = async (req, res) => {
    var id_r = req.params.id;
    condition = {};
    condition._id = id_r; // Chú ý dùng _id là string còn id là object
    change = {};
    change.deleted = true;
    try {
        await modelP.updateOne(condition, { $set: change });
    } catch (error) {
        console.log(error);
    }
    res.redirect('/admin/product');
}

module.exports.GrabageGET = async (req, res) => {
    condition = {
        deleted: true
    }
    var data_d = await modelP.find(condition);
    res.render('server/pages/product/grabage.pug', {
        data: data_d
    })
}
module.exports.GrabagePATCH = async (req, res) => {
    condition = {
        _id: req.params.id
    }
    await modelP.updateOne(condition, { $set: { deleted: false } }); // Chú ý phải có $set nếu muốn đổi 1 key
    res.redirect('/admin/product/grabage');
}
module.exports.GrabageDelete = async (req, res) => {
    condition = {
        _id: req.params.id
    }
    await modelP.deleteOne(condition);
    res.redirect('/admin/product/grabage');
}
module.exports.GrabagePATCH2 = async (req, res) => {
    condition = {
        _id: req.params.id
    }
    var document = await model.find(condition)[0];
    document.deleted = false;
    await modelP.updateOne(condition, document);
    res.redirect('/admin/product/grabage');
}

module.exports.addProduct = async (req, res) => {
    var condition= {};
    var data = await typeModel.find(condition);
    res.render('server/pages/product/add.pug',{
        dType: data
    });
};

module.exports.addProductPost = (req, res) => {
    var myPromiseUpload = uploadsFunction(req.files.thumbnail[0].buffer);
    myPromiseUpload
        .then(async (result) => {
            var data = req.body; // req.body là cái được gửi tới 
            // do các ô input có name là title, price, status, position, description
            //  giống với các key của schema
            //--> không cần tạo object thông tin nữa mà dùng luôn cái này làm object thông tin
            data.thumbnail = result.url;
            var product = new modelP(data);
            await product.save();
            res.redirect('/admin/product');
        });
}

module.exports.detailProduct = async (req, res) => {
    var id = req.params.id;
    var data = await modelP.find({ _id: id });
    res.render('server/pages/product/detail.pug', {
        data: data[0]
    });
}

module.exports.editProduct = async (req, res) => {
    var id = req.params.id;
    var data = await modelP.find({ _id: id });
    var dataType = await typeModel.find({
        deleted: false
    });
    res.render('server/pages/product/edit.pug', {
        data: data[0],
        dataT: dataType
    });
}

module.exports.editProductPatch = async (req, res) => {
    if (req.files.thumbnail) {
        var myPromiseUpload = uploadsFunction(req.files.thumbnail[0].buffer);
        myPromiseUpload
            .then(async (result) => {
                var id = req.params.id;
                var data = req.body;
                data.thumbnail = result.url;
                await modelP.updateOne({ _id: id }, data);
                res.redirect('/admin/product');
            });
    }
    else { // nếu không có file ảnh mới thì cập nhật cho bằng file cũ tương đương không cập nhật
        var id = req.params.id;
        var data = req.body;
        var record = await modelP.find({ _id: id });
        data.thumbnail = record[0].thumbnail;
        await modelP.updateOne({ _id: id }, data);
        res.redirect('/admin/product');
    }
}