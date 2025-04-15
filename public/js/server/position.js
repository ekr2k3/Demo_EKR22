//position.js
var inputAll = document.querySelectorAll('.position');
var buttonx = document.querySelector('#option button');
buttonx.addEventListener("click", (e) => {
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
    // sau khi end đoạn này thì chúng ta sẽ có một mảng chứa các checkbox được checked
    // và 1 mảng các ô input của position
    // ta cần lọc ra các ô input của position được checked
    var inputChecked = [];
    for (var i = 0; i < checkbox_checked.length; i++) {
        var id_cb = checkbox_checked[i].getAttribute('id_item');
        for (var j = 0; j < inputAll.length; j++) {
            var id_input = inputAll[j].getAttribute('id_item');
            if (id_input === id_cb) {
                inputChecked.push(inputAll[j]);
            }
        }
    }
    // Tạo chuỗi từ các input được checked
    var s = "";
    inputChecked.forEach((input_position) => {
        s += input_position.getAttribute('id_item') + '-' + input_position.value + ';';
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
    alert(input.value);
    if (select.value === "position") {
        // Gửi biểu mẫu
        var url = '/admin/product' + '?_method=PATCH';
        form.setAttribute('action', url)
        form.submit();
    }
});



// bấm để tích toàn bộ checkbox
var all = document.querySelector('[name = "all"]');
all.onclick = () => {
    var checkboxs = document.querySelectorAll('.choice');
    if (all.checked == false) {
        checkboxs.forEach((x) => {
            x.checked = false
        })
    }
    else {
        checkboxs.forEach((x) => {
            x.checked = true
        })
    }
}