//previewImgChat.js

//Ấn vào button để click vô file
const inputFile = document.getElementById("file-input");
const buttonFile = document.getElementById("click_input_file");

buttonFile.addEventListener("click", function () {
    inputFile.click();
});




var temp = []; //- Tạo mảng tạm để lưu các file đã chọn
// Lấy đoạn sẽ hiển thị ảnh preview
const imagePreview = document.getElementById('image-preview');
// Mỗi khi bấm vào nút chọn file, sẽ mở ra hộp thoại chọn file
// và khi chọn thì sẽ thay đổi số lượng file --> Gọi sự kiện change
inputFile.addEventListener("change", function (e) {
    temp = []; //- Reset mảng tạm về rỗng để tránh lỗi khi chọn file mới
    const files = e.target.files; //- Lấy danh sách file đã chọn
    // Lặp qua từng file
    for (let file of files) {
        temp.push(file); //- Thêm file vào mảng tạm
        //Tạo url bioObject cho từng file
        const blobUrl = URL.createObjectURL(file);

        // Tạo khung preview + nút xoá
        const container = document.createElement('div');
        container.classList.add('inline-block', 'mr-2'); // Các ảnh xếp ngang nhau

        const img = document.createElement('img');
        img.src = blobUrl;
        img.classList.add('w-20', 'h-20', 'object-cover', 'rounded-md', 'border', 'border-gray-300');

        const removeBtn = document.createElement('span');
        removeBtn.textContent = '❌';
        removeBtn.classList.add('ml-2', 'cursor-pointer', 'text-red-500');

        // Xử lý khi bấm nút xoá
        removeBtn.addEventListener('click', () => {
            imagePreview.removeChild(container);
            URL.revokeObjectURL(blobUrl); // Giải phóng bộ nhớ
            // Xóa file khỏi mảng tạm
            const index = temp.indexOf(file);
            if (index > -1) {
                temp.splice(index, 1);
            }
        });

        container.appendChild(img);
        container.appendChild(removeBtn);

        // Thêm ảnh vào đầu khung preview
        imagePreview.insertBefore(container, imagePreview.firstChild);

        // In ra danh sách tên và URL tạm để kiểm tra trong tab console xem có hoạt động ko
        console.log('File:', file.name);
        console.log('Blob URL:', blobUrl);
    }
});


// Mảng tạm chính là mảng chứa các file đã chọn


















