/* changeone.js */
var button_1 = document.querySelectorAll('[status]'); // Xung đột với thay đổi nhiều do cùng tên button_1
for(let i=0;i<button_1.length;i++){
    button_1[i].addEventListener('click',function(){
        var id = button_1[i].getAttribute('id_item');
        alert(id)
        var status = button_1[i].getAttribute('status');
        if(status == 'active'){
            status = 'inactive';
        }else{
            status = 'active';
        }
        var formData = document.getElementById('form-co');
        alert(i);
        url = `/admin/product/${id}/${status}/hi?_method=PATCH`;
        alert(url);
        formData.setAttribute('action',url);
        formData.submit();
    });
}