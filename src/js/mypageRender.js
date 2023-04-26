//어차피 마이페이지 접근은 토큰이 있을 때만 접근 가능함.
const myData = JSON.parse(localStorage.getItem("myData"));
const userData = JSON.parse(localStorage.getItem("userData"));
const userName = document.querySelector(".user-name");
const userEmail = document.querySelector(".email");

if (
    myData.data.userName !== userData.userName ||
    myData.data.email !== userData.email
) {
    userName.innerHTML = myData.data.userName;
    userEmail.innerHTML = myData.data.email;
} else {
    userName.innerHTML = userData.userName;
    userEmail.innerHTML = userData.email;
}
