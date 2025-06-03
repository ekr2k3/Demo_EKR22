//-socketFriend.js

// kiểm tra xem đã import socket.io-client chưa
//alert("Đã import socketFriend.js");

var point = document.querySelector('a[href="/friend/listrequest"]');

// kiểm tra đã lấy được thẻ chưa
var spanPoint = point.querySelector('span');
console.log(spanPoint);


// chú ý rằng các file khác nếu muốn dùng js này
// đều đã phải import socket.io-client và khai váo io() với cùng 1 tên là socket

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=');
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

// nhận sự kiện updateRequestToMeCount
socket.on("updateRequestToMeCount", function (data) {
    console.log("Sự kiện có hoạt động được");
    // dùng data.token để xác định người dùng
    if(data.token === getCookie("token_client")){
        spanPoint.innerHTML = data.count;
    }
});


  // Hàm disable toàn bộ button và a
  function disableAll() {
    // Disable tất cả nút
    document.querySelectorAll('button').forEach(btn => {
      btn.disabled = true;
    });

    // Disable tất cả a bằng cách thêm class hoặc attribute pointer-events none
    document.querySelectorAll('a').forEach(link => {
      link.style.pointerEvents = 'none';  // không thể click được
      link.style.opacity = '0.6';          // cho nhìn mờ đi để dễ nhận biết
    });
  }

  // Hàm enable lại toàn bộ button và a
  function enableAll() {
    document.querySelectorAll('button').forEach(btn => {
      btn.disabled = false;
    });
    document.querySelectorAll('a').forEach(link => {
      link.style.pointerEvents = 'auto';
      link.style.opacity = '1';
    });
  }

  // Gán sự kiện click cho toàn bộ button và a
  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('click', (e) => {
      disableAll();
      setTimeout(() => {
        enableAll();
      }, 1000);  // 1 giây
    });
  });