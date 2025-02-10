//grabage.js
var bdf = document.querySelectorAll('.d_f');
var br = document.querySelectorAll('.recover');

for(let i = 0; i<br.length; i++){
    br[i].onclick = ()=>{
        var id_r = br[i].getAttribute("id_r").toString();
        var url = "/admin/product/grabage/" + id_r + "/?_method=PATCH";
        alert(url)
        var F = document.createElement('form');
        document.querySelector('body').appendChild(F);
        F.setAttribute("action", url);
        F.setAttribute("method", "post");
        F.submit();
    }
}

for(let i = 0; i<bdf.length; i++){
    bdf[i].onclick = ()=>{
        var id_r = bdf[i].getAttribute("id_r");
        var url = "/admin/product/grabage/" + id_r + "/?_method=DELETE";
        var F = document.createElement('form');
        document.querySelector('body').appendChild(F);
        F.setAttribute("action", url);
        F.setAttribute("method", "post");
        F.submit();
    }
}

