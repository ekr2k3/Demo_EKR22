//Phan_trang.js [server]
var listA = document.querySelectorAll('li button');

for(let i = 1; i< listA.length - 1; i++){
    listA[i].onclick = function(){
        var number = listA[i].getAttribute('page');
        var currentUrl = new URL(window.location.href);
        if(number == 0){
            currentUrl.searchParams.delete('index');
            window.location.href = currentUrl.href;
        }
        else{
            currentUrl.searchParams.set('index', number);
            window.location.href = currentUrl.href;
        }
    }
}

listA[0].onclick = function(){
    var currentUrl = new URL(window.location.href);
    var number = currentUrl.searchParams.get('index');
    if(number){
        if(number >=1){
            number--;
            if(number == 0){ 
                currentUrl.searchParams.delete('index');
                window.location.href = currentUrl.href;
            }else{
                currentUrl.searchParams.set('index', number);
                window.location.href = currentUrl.href;
            }   
        }
    }
}

listA[listA.length - 1].onclick = function(){
    var currentUrl = new URL(window.location.href);
    var number = currentUrl.searchParams.get('index');
    var total = listA.length - 2 - 1; //length đại diện cho số trang - 2 là trừ prev và next và - 1 vì index bắt đầu từ 0
    if(number){
        if(number < total){
            number++;
            currentUrl.searchParams.set('index', number);
            window.location.href = currentUrl.href;
        }
    }
    else{
        currentUrl.searchParams.set('index', 1);
        window.location.href = currentUrl.href;
    }
}