var burgerbtn = document.querySelector('#burgerbtn');
var menuphone = document.querySelector('#menu');
var mlink = document.querySelectorAll('.nav-phone__link');

burgerbtn.addEventListener('click', function (event) {
  event.preventDefault();
});

for (var i = 0; i < mlink.length; i++) {
  mlink[i].addEventListener('click', function (event) {
    menuphone.style.display = 'none';
  });
}

burgerbtn.addEventListener('click', function () {
  menuphone.style.display = 'flex';
});

closebtn.addEventListener('click', function () {
  menuphone.style.display = 'none';
});