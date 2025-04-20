var quantity = document.querySelectorAll(".cart-quantity");

for(let i = 0; i < quantity.length; i++){
    quantity[i].addEventListener("change", function (e) {
        var product_id = quantity[i].getAttribute("id_product");
        var soLg = quantity[i].value;
        var url = "/cart/update/" + product_id + "/" + soLg;
        window.location.href = url; // gửi http req tới url [get]
    });
}