//preview.js
var inputFile = document.getElementById('Thumbnail');
var img_tem = document.querySelector('#tem');
var img = document.createElement('img');
inputFile.onchange = (event)=>{
    if(img_tem){
        img_tem.remove();
    }
    var file = event.target.files[0];
    var url = URL.createObjectURL(file);
    img.setAttribute('src', url);
    var preview = document.getElementById('preview');
    preview.setAttribute('style', 'width:20vw');
    preview.appendChild(img);
}

