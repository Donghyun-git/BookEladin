/* 관리자 정보 */
const userData = JSON.parse(localStorage.getItem("userData"));
const adminName = document.querySelector(".user-name");
const email = document.querySelector(".email");

adminName.innerHTML = userData.userName;
email.innerHTML = userData.email;



