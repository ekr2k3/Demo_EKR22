//controller nhóm cart
const cartModel = require('../../models/cart.model');
var Cart = require('../../models/cart.model');
var Product = require('../../models/itemPhone');

module.exports.addToCart = async (req, res) => {
    //lấy cart_id từ cookies
    //lấy id sản phẩm từ params
    //lấy số lượng sản phẩm từ body được gửi qua post
    //update lại số lượng sản phẩm X trong product

    // Do 1 giỏ hàng có thể có nhiều sản phẩm khác nhau
    // để tránh việc nếu tại thời điểm A ta add sản phẩm X vào giỏ hàng
    // rồi tại thời điểm B ta lại add sản phẩm X vào giỏ hàng
    // thì sẽ tạo 2 phần tử của mảng có cùng id product
    // thì ta phải kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    // nếu có thì ta chỉ cần tăng số lượng sản phẩm lên 
    // nếu chưa có thì ta sẽ thêm sản phẩm vào giỏ hàng

    //Note Products là 1 mảng các object có dạng {pro_id: , quantity: }
    var cartId = req.cookies.cart_id;
    var productId = req.params.id;
    var quantity = req.body.quantity;

    var product = await Product.findById(productId);
    //product.stock -= quantity; // giảm số lượng sản phẩm trong kho đi sai vì chỉ giảm khi đã thanh toán
    await product.save(); // lưu lại thay đổi vào db

    var cart = await Cart.findById(cartId); // tìm giỏ hàng theo id
    var arr_product = cart.products; // lấy mảng sản phẩm trong giỏ hàng
    var check = false; // biến cờ để kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    for (var i = 0; i < arr_product.length; i++) {
        if (arr_product[i].pro_id == productId) { // nếu sản phẩm đã có trong giỏ hàng

            if (arr_product[i].quantity > product.stock) { // nếu số lượng sản phẩm trong giỏ hàng lớn hơn số lượng sản phẩm trong kho
                req.flash('error', 'Số lượng sản phẩm trong giỏ hàng lớn hơn số lượng sản phẩm trong kho'); // thông báo lỗi
                res.redirect('/home'); // chuyển hướng về tạm trang home
                return; // dừng hàm lại
            }
            // Đoạn if phải ở trên
            //arr_product[i].quantity += quantity; // tăng số lượng sản phẩm lên // Mã cũ chưa convert --> + string
            arr_product[i].quantity = Number(arr_product[i].quantity) + Number(quantity); // tăng số lượng sản phẩm lên nhưng nhớ convert
            check = true; // đánh dấu là đã có sản phẩm trong giỏ hàng
            break;
        }
    }
    if (!check) { // nếu sản phẩm chưa có trong giỏ hàng
        arr_product.push({ pro_id: productId, quantity: quantity }); // thêm sản phẩm vào giỏ hàng
    }
    cart.products = arr_product; // cập nhật lại mảng sản phẩm trong giỏ hàng
    await cart.save(); // lưu lại thay đổi vào db

    res.redirect('/home'); // chuyển hướng về tạm trang home
}

module.exports.getCart = async (req, res) => {
    var cartId = req.cookies.cart_id; // lấy cart_id từ cookies
    var cart = await Cart.findById(cartId); // tìm giỏ hàng theo id

    var products_in_shop = await Product.find({ deleted: false }); // tìm tất cả sản phẩm trong shop
    var products_in_cart = []; // mảng chứa các sản phẩm trong giỏ hàng
    for (var i = 0; i < cart.products.length; i++) { // duyệt qua từng sản phẩm trong giỏ hàng
        for (var j = 0; j < products_in_shop.length; j++) { // duyệt qua từng sản phẩm trong shop
            if (cart.products[i].pro_id == products_in_shop[j]._id) { // nếu sản phẩm trong giỏ hàng có trong shop
                products_in_cart.push({
                    quantity: cart.products[i].quantity,
                    thumbnail: products_in_shop[j].thumbnail,
                    name: products_in_shop[j].title,
                    price: products_in_shop[j].price,
                    id: products_in_shop[j]._id,
                }); // thêm sản phẩm vào mảng sản phẩm trong giỏ hàng
                break; // hủy loop trong
            }
        }
    }
    console.log(products_in_cart); // in ra mảng sản phẩm trong giỏ hàng
    res.render('client/pages/cart/index.pug', { // render ra trang giỏ hàng
        cart_have: products_in_cart, // truyền mảng sản phẩm trong giỏ hàng vào view
    });
}

module.exports.deleteCart = async (req, res) => {
    // lấy cart_id từ cookies
    // lấy id sản phẩm từ params
    // lấy danh sách sản phẩm trong giỏ hàng
    // duyệt qua từng sản phẩm trong giỏ hàng
    // nếu sản phẩm có trong giỏ hàng thì xóa sản phẩm đó khỏi giỏ hàng
    // cập nhật lại giỏ hàng
    // lưu lại thay đổi vào db
    var cartId = req.cookies.cart_id; // lấy cart_id từ cookies
    var productId = req.params.id; // lấy id sản phẩm từ params
    var cart = await Cart.findById(cartId); // tìm giỏ hàng theo id
    var arr_product = cart.products; // lấy danh sách sản phẩm trong giỏ hàng
    for (var i = 0; i < arr_product.length; i++) { // duyệt qua từng sản phẩm trong giỏ hàng
        if (arr_product[i].pro_id == productId) { // nếu sản phẩm có trong giỏ hàng
            arr_product.splice(i, 1); // xóa sản phẩm đó khỏi giỏ hàng
            break; // hủy loop trong
        }
    }
    cart.products = arr_product; // cập nhật lại giỏ hàng
    await cart.save(); // lưu lại thay đổi vào db
    res.redirect('/cart'); // chuyển hướng về trang giỏ hàng
}

module.exports.updateCart = async (req, res) => {
    var cartId = req.cookies.cart_id; // lấy cart_id từ cookies
    var productId = req.params.id; // lấy id sản phẩm từ params
    var product = await Product.findById(productId); // tìm sản phẩm theo id
    var quantity = req.params.quantity; // lấy số lượng sản phẩm từ params
    var cart = await Cart.findById(cartId); // tìm giỏ hàng theo id
    var arr_product = cart.products; // lấy danh sách sản phẩm trong giỏ hàng
    for (var i = 0; i < arr_product.length; i++) { // duyệt qua từng sản phẩm trong giỏ hàng
        if (arr_product[i].pro_id == productId) { // nếu sản phẩm có trong giỏ hàng
            if (quantity > product.stock || quantity <= 0) { // nếu số lượng sản phẩm trong giỏ hàng lớn hơn số lượng sản phẩm trong kho quantity <= 0
                req.flash('error', 'Số lượng sản phẩm trong giỏ hàng lớn hơn số lượng sản phẩm trong kho'); // thông báo lỗi
                res.redirect('/cart'); // chuyển hướng về tạm trang cart
                return; // dừng hàm lại
            }
            arr_product[i].quantity = quantity; // cập nhật lại số lượng sản phẩm
            break; // hủy loop trong
        }
    }
    cart.products = arr_product; // cập nhật lại giỏ hàng
    await cart.save(); // lưu lại thay đổi vào db
    res.redirect('/cart'); // chuyển hướng về trang giỏ hàng
}

module.exports.checkout = async (req, res) => {
    var cartId = req.cookies.cart_id; // lấy cart_id từ cookies
    var cart = await Cart.findById(cartId); // tìm giỏ hàng theo id

    var products_in_shop = await Product.find({ deleted: false }); // tìm tất cả sản phẩm trong shop
    var products_in_cart = []; // mảng chứa các sản phẩm trong giỏ hàng
    for (var i = 0; i < cart.products.length; i++) { // duyệt qua từng sản phẩm trong giỏ hàng
        for (var j = 0; j < products_in_shop.length; j++) { // duyệt qua từng sản phẩm trong shop
            if (cart.products[i].pro_id == products_in_shop[j]._id) { // nếu sản phẩm trong giỏ hàng có trong shop
                products_in_cart.push({
                    quantity: cart.products[i].quantity,
                    thumbnail: products_in_shop[j].thumbnail,
                    name: products_in_shop[j].title,
                    price: products_in_shop[j].price,
                    id: products_in_shop[j]._id,
                }); // thêm sản phẩm vào mảng sản phẩm trong giỏ hàng
                break; // hủy loop trong
            }
        }
    }
    console.log(products_in_cart); // in ra mảng sản phẩm trong giỏ hàng
    res.render('client/pages/cart/checkout.pug', { // render ra trang thanh toán
        cart_have: products_in_cart, // truyền mảng sản phẩm trong giỏ hàng vào view
    });
}

var orderModel = require("../../models/order.model");
module.exports.checkoutPost = async (req, res) => {
    var orderDocument = new orderModel();
    orderDocument.cart_id = req.cookies.cart_id;

    orderDocument.user_info = req.body;

    var cart = await cartModel.findById(req.cookies.cart_id);
    orderDocument.products = cart.products;

    await orderDocument.save();
    //- cập nhập lại giỏ hang khi đã đặt thành công
    cart.products = [];
    await cart.save();
    //- cập nhập lại số lượng sản phẩm trong kho khi đặt hàng thành công
    for (var i = 0; i < orderDocument.products.length; i++) {
        var product = await Product.findById(orderDocument.products[i].pro_id);
        product.stock -= orderDocument.products[i].quantity;
        await product.save();
    }
    res.redirect("/cart/checkout/success/" + orderDocument._id);
}

module.exports.checkoutSuccess = async (req, res) => {
    var id_chekcout = req.params.id;
    var checkout = await orderModel.findById(id_chekcout);

    var products_checkout = [];
    var products_in_shop = await Product.find({ deleted: false })
    for (var i = 0; i < checkout.products.length; i++) { // duyệt qua từng sản phẩm trong đơn hàng
        for (var j = 0; j < products_in_shop.length; j++) { // duyệt qua từng sản phẩm trong shop
            if (checkout.products[i].pro_id == products_in_shop[j]._id) { // nếu sản phẩm trong giỏ hàng có trong shop
                console.log("12")
                products_checkout.push({
                    quantity: checkout.products[i].quantity,
                    thumbnail: products_in_shop[j].thumbnail,
                    name: products_in_shop[j].title,
                    price: products_in_shop[j].price,
                    id: products_in_shop[j]._id,
                }); // thêm sản phẩm vào mảng sản phẩm trong giỏ hàng
                break; // hủy loop trong
            }
        }
    }
    console.log(checkout);
    console.log(products_in_shop);
    console.log(products_checkout)
    res.render("client/pages/cart/success.pug",{
        dataCheckOut : checkout.user_info,
        dataProductCheckOut : products_checkout
    })
}