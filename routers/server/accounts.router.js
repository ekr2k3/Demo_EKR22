// account router
var express = require('express');
var router = express.Router();
var controllerACC = require('../../controller/server/accounts.controller');
var validateAcc = require('../../validation/server/account.validation.middleware');
var multer = require('../../config/multer.js'); // require instance multer

var middlewareUpload = multer.fields(
    [
        { name: 'avata', maxCount: 1 }
    ]
);
router.get('/', controllerACC.getAccounts);
router.get('/create', controllerACC.getCreateAccounts);
router.post('/create', middlewareUpload, validateAcc.postCreateAccounts, controllerACC.postCreateAccounts);

router.get('/edit/:id', controllerACC.getUpdateAccounts);
router.patch('/edit/:id', middlewareUpload, validateAcc.patchEditAccounts, controllerACC.patchEditAccounts);
module.exports = router;