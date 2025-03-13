//type.router.js
var ex = require('express');
var router = ex.Router();
var controllerType = require('../../controller/server/type.controller.js');
var middlewareValidateType = require('../../validation/server/type.validation.middleware.js');
var multer = require('../../config/multer.js'); // require instance multer

var middlewareUpload = multer.fields(
    [
        { name: 'thumbnail', maxCount: 1 }
    ]
);

router.get('/', controllerType.indexPage);
router.get('/create', controllerType.createGet);
router.post('/create', middlewareUpload, middlewareValidateType.createPostValidation, controllerType.createPost);


router.get('/edit/:id', controllerType.editGet);
router.patch('/edit/:id', middlewareUpload, middlewareValidateType.editPatchValidation, controllerType.editPatch);
module.exports = router;