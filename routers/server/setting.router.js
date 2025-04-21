// file router nhóm setting bên admin

var ex = require('express');
var router = ex.Router();
var controllerSetting = require('../../controller/server/setting.controller')
var multer = require('../../config/multer.js'); // require instance multer
var middlewareUpload = multer.fields(
    [
        { name: 'logo', maxCount: 1 }
    ]
);


router.get('/general', controllerSetting.generalGet);
router.get('/general/create', controllerSetting.create);
router.get('/general/edit/:id', controllerSetting.edit);
router.post('/general/create', middlewareUpload, controllerSetting.createPost);
router.patch('/general/edit/:id', middlewareUpload, controllerSetting.editPatch);
module.exports = router;