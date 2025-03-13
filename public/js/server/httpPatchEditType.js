//httpPatchEditType
var button_edit_patch = document.querySelector('input[value="edit Type"]');

button_edit_patch.onclick = (event)=>{
    event.preventDefault();
    var cur_url = window.location.href;
    var form = document.querySelector('form');
    var string_action = cur_url + '?_method=PATCH';
    form.setAttribute('action', string_action);
    form.submit();
}