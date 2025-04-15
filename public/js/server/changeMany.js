//Change Many
var button = document.querySelector('#option button');
button.addEventListener("click", (e) => {
    e.preventDefault();
    // Lấy các checkbox trên trang hiện tại
    var checkboxs = document.querySelectorAll('.choice');
    
    // Lấy các checkbox được checked
    var checkbox_checked = [];
    checkboxs.forEach((checkbox) => {
        if (checkbox.checked) {
            checkbox_checked.push(checkbox);
        }
    });

    // Tạo chuỗi từ các checkbox được checked
    var s = "";
    checkbox_checked.forEach((checkbox) => {
        s += checkbox.getAttribute('id_item') + ';';
    });

    // Xóa ký tự `;` cuối cùng (nếu có)
    if (s.endsWith(';')) {
        s = s.slice(0, s.length - 1);
    }

    // Gán giá trị chuỗi `s` vào ô input
    var input = document.querySelector("#option input[type='text']");
    input.value = s;
    // Kiểm tra giá trị của select
    var form = document.querySelector('#option');
    var select = form.querySelector('select');
    if (select.value === "") {
        alert("Hãy chọn hành động trước khi gửi");
    } else {
        // Gửi biểu mẫu
        var url = '/admin/product' + '?_method=PATCH';
        form.setAttribute('action',url);
        form.submit();
    }
});

var all = document.querySelector('[name = "all"]');
all.onclick= ()=>{
    var checkboxs = document.querySelectorAll('.choice');
    if(all.checked == false){
        checkboxs.forEach((x)=>{
            x.checked = false
        })
    }
    else{
        checkboxs.forEach((x)=>{
            x.checked = true
        })
    }
}











