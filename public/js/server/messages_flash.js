//messages_flash
setTimeout(() => {
    alert('Hello');
    var flash_success = document.querySelector('.success');
    flash_success.setAttribute("hidden", true);
}, 3000);

setTimeout(() => {
    var flash_error = document.querySelector('.error');
    flash_error.setAttribute("hidden", true);
}, 3000);