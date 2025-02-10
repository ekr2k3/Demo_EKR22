//search.js [server]
var bsubmit = document.querySelector('#sear');
bsubmit.onclick = function (e) {
    e.preventDefault();
    input = document.querySelector('[name="title"]');
    var search = input.value;
    alert(search);
    currentUrl = new URL(window.location.href);
    if (search.trim() == '') {
        currentUrl.searchParams.delete('title');
        window.location.href = currentUrl.href;
    }
    else{
        currentUrl.searchParams.set('title', search);
        window.location.href = currentUrl.href;
    }
}