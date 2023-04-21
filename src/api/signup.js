const id = document.querySelector("#id");
const password = document.querySelector("#password");
const userName = document.querySelector("#name");
const email = document.querySelector("#email");

const signupButton = document.querySelector("#signup-btn");

signupButton.addEventListener("click", () => {
  const uri = "http://localhost:5500/auth/signup";
  const userData = {
    userId: id.value,
    password: password.value,
    userName: userName.value,
    email: email.value
  };
  axios
    .post(uri, userData)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('token', token);

      
    })
    .catch((error) => {
      console.error(error);
    });
});
