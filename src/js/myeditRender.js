const myData = JSON.parse(localStorage.getItem('myData')).data;

const { userId, email, userName } = myData;

const nameText = document.querySelector('.change-username');
const idText = document.querySelector('.change-userid');
const emailText = document.querySelector('.change-email');

nameText.value = userName;
idText.value = userId;
emailText.value = email;