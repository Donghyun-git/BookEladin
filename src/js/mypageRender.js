//어차피 마이페이지 접근은 토큰이 있을 때만 접근 가능함.
const myData = JSON.parse(localStorage.getItem('myData'));
const userName = document.querySelector('.user-name');
const userEmail = document.querySelector('.email');

userName.innerHTML = `${myData.userName}`;
userEmail.innerHTML = `${myData.email}`;
