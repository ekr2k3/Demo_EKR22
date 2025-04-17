//controller nhóm cart
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
    product.stock -= quantity; // giảm số lượng sản phẩm trong kho đi
    await product.save(); // lưu lại thay đổi vào db

    var cart = await Cart.findById(cartId); // tìm giỏ hàng theo id
    var arr_product = cart.products; // lấy mảng sản phẩm trong giỏ hàng
    var check = false; // biến cờ để kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    for (var i = 0; i < arr_product.length; i++) {
        if (arr_product[i].pro_id == productId) { // nếu sản phẩm đã có trong giỏ hàng
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
