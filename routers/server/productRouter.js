// productRouter.js [admin]
var ex = require('express');
var multer = require('../../config/multer.js'); // require instance multer
var modelP = require('../../models/itemPhone.js');
var router = ex.Router();
var productController = require('../../controller/server/productController');
var productValidation = require('../../validation/product.validation.js');
router.get('/', productController.getProduct);

router.patch('/:id/:status/hi', productController.changeStatus);
router.patch('/', productController.changeMany);
router.delete('/delete/:id', productController.delete_data);
router.delete('/delete_t/:id', productController.delete_p);
router.get('/grabage', productController.GrabageGET);

router.patch('/grabage/:id', productController.GrabagePATCH);
router.delete('/grabage/:id', productController.GrabageDelete);

router.get('/add', productController.addProduct);
var middlewareUpload = multer.fields(
    [
        { name: 'thumbnail', maxCount: 1 }
    ]
);
router.post('/add', middlewareUpload, productValidation.validation_create, productController.addProductPost);
router.get('/detail/:id', productController.detailProduct);
router.get('/edit/:id', productController.editProduct);

router.patch('/edit/:id', middlewareUpload, productValidation.validation_update, productController.editProductPatch);
module.exports = router;