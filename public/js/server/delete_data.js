//delete_data.js
var button_delete_data = document.querySelectorAll(".B_D");
for(let i = 0; i<button_delete_data.length; i++){
    button_delete_data[i].onclick = ()=>{
        alert(i);
        var id_r = button_delete_data[i].getAttribute("id_r");
        var url = "/admin/product/delete/" + id_r + "/?_method=DELETE";
        var F = document.createElement('form');
        document.querySelector('body').appendChild(F);
        F.setAttribute("action", url);
        F.setAttribute("method", "post");
        alert(url);
        F.submit();
    }
}
