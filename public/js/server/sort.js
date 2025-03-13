//sort.js
/* 
    Chú ý khi đưa đoạn này vào file html có impory nhiều file js khác
    Cần đặt tên các biến khác đi để tránh trùng tên biến
    Dọc tại https://docs.google.com/document/d/1RwGHdpPPnSPaF7YBi8bTbKhyL2TQPgpr3uFLJ0hva2o/edit?usp=drive_link
    [Khi 1 file html dùng 2 file js]
*/
// Page load
function page_load() {
    var current_url = new URL(window.location.href);
    var typeSort = current_url.searchParams.get("typeSort");
    var valueSort = current_url.searchParams.get("valueSort");
    if (typeSort && valueSort) {
        var stringSort = typeSort + "-" + valueSort;
        var optionSort = document.querySelector('option[value="' + stringSort + '"]');
        // Chú ý đoạn này khi select theo value phải Bọc thêm Dấu để biểu hiện là string
        // ==> Ta mới thấy dấu nháy kép bọc nháy đơn
        optionSort.selected = true;
    }
};
page_load(); //Luôn gọi hàm lày khi page load để load lại các giá trị cũ hoặc giá trị được gửi tới

var buttonSort = document.getElementById('sort_button');
buttonSort.onclick = ()=>{
    var selectSort = document.getElementById('sort_select');
    var valueSort = selectSort.value;
    var current_url = new URL(window.location.href);
    var typeSort = valueSort.split('-')[0];
    var valueSort = valueSort.split('-')[1];
    current_url.searchParams.set("typeSort", typeSort);
    current_url.searchParams.set("valueSort", valueSort);
    window.location.href = current_url;
}