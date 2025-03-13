//type.controller.js
var Type_model = require('../../models/types.model.js');
var uploadsFunction = require('../../config/configUpload.js'); // import để dùng hàm upload tới cloud


module.exports.indexPage = async (req, res) => {
    var condition = { deleted: false };
    var types = await Type_model.find(condition);
    res.render('./server/pages/type/index.pug', {
        DataTypes: types
    });
}
module.exports.createGet = async (req, res) => {
    var condition = {
        deleted: false
    }
    var data = await Type_model.find(condition);
    res.render('./server/pages/type/create.pug', {
        dataTypes: data
    });
}

module.exports.createPost = (req, res) => {
    var myPromiseUpload = uploadsFunction(req.files.thumbnail[0].buffer);
    myPromiseUpload
        .then(async (result) => {
            var data = req.body;
            if (data.parent_id == "" || data.parent_id == null || data.parent_id == undefined) {
                data.parent_id = "root"
            }
            data.thumbnail = result.url;
            var types = new Type_model(data);
            await types.save();
            res.redirect('/admin/type');
        });
}

module.exports.editGet = async (req, res) => {
    var condition = {
        deleted: false,
        _id: req.params.id
    }
    var data = await Type_model.find(condition);
    var dataTrue = data[0];
    var dataTypes = await Type_model.find({
        deleted: false
    });
    console.log(dataTrue);
    console.log(dataTypes);
    res.render('./server/pages/type/edit.pug', {
        d: dataTrue,
        dataTypes: dataTypes
    })
}

module.exports.editPatch = async (req, res) => {
    if (req.files.thumbnail) {
        var myPromiseUpload = uploadsFunction(req.files.thumbnail[0].buffer);
        myPromiseUpload
            .then(async (result) => {
                var id = req.params.id;
                var data = req.body;
                data.thumbnail = result.url;
                await Type_model.updateOne({ _id: id }, data);
                res.redirect('/admin/type');
            });
    }
    else { // nếu không có file ảnh mới thì cập nhật cho bằng file cũ tương đương không cập nhật
        var id = req.params.id;
        var data = req.body;
        var record = await Type_model.find({ _id: id });
        data.thumbnail = record[0].thumbnail;
        await Type_model.updateOne({ _id: id }, data);
        res.redirect('/admin/type');
    }
}