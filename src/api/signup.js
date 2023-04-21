const id = document.querySelector("#id");
const password = document.querySelector("#password");
const userName = document.querySelector("#name");
const email = document.querySelector("#email");

const signupButton = document.querySelector("#signup-btn");

signupButton.addEventListener("click", async () => {
  const uri = "http://localhost:5500/auth/signup";
  const userData = {
    userId: id.value,
    password: password.value,
    userName: userName.value,
    email: email.value,
  };

  await axios.post(uri, userData)
    .then((res) => {
      console.log(res);
      window.alert(`${res.data.message}`);
      window.location.href = "./login.html";
    })
    .catch((error) => {
      console.error(error);
      window.alert(`${error.response.data.message}`);
    });
});
