// file controller nhóm setting bên admin

var modelSettingGen = require('../../models/setting-general.model');
var uploadsFunction = require('../../config/configUpload.js');
module.exports.createPost = (req, res) => {
    // do không có file validation --> tôi sẽ validation trong controller luôn
    if(!req.flies && !req.files.logo[0]){
        req.flash("error", "Cần có ảnh")
        res.redirect('/admin/setting/general/create');
        return;
    }
    // validate khác nếu thích
    var myPromiseUpload = uploadsFunction(req.files.logo[0].buffer);
    myPromiseUpload
        .then(async (result) => {
            var data = req.body;
            data.logo = result.url;
            console.log(data);
            var setting = new modelSettingGen(data);
            await setting.save();
            res.redirect('/admin/setting/general');
        });
}

module.exports.generalGet = async (req, res) => {
    var setting = await modelSettingGen.find({}); // trả 1 mảng
    // mà trong cái collection này sẽ luôn chỉ làm việc với 1 bản ghi
    // bản ghi thứ 2 or 3 thường để làm dự phòng thôi
    // --> Ta coi như chỉ có 1 bản ghi
    res.render("./server/pages/setting/general.pug", {
        setting: setting[0]
    });
}


module.exports.create = (req, res) => {
    res.render("./server/pages/setting/create.pug");
}

module.exports.edit = async (req, res) => {
    var settingDocument = await modelSettingGen.find({
        _id: req.params.id
    }); // trả 1 mảng
    console.log(settingDocument[0])
    res.render("./server/pages/setting/edit.pug",{
        setting: settingDocument[0]
    });
}

module.exports.editPatch = async(req, res)=>{
    var id = req.params.id;
    var data = req.body;
    if(req.files.logo){
        var myPromiseUpload = uploadsFunction(req.files.logo[0].buffer);
        myPromiseUpload
            .then(async (result) => {
                data.logo = result.url;
                await modelSettingGen.updateOne({ _id: id }, data);
                res.redirect('/admin/setting/general');
            });
    }
    else{
        var record = await modelSettingGen.find({ _id: id });
        data.logo = record[0].logo;
        await modelSettingGen.updateOne({ _id: id }, data);
        res.redirect('/admin/setting/general');
    }
}