const signupButton = document.querySelector("#signup-btn");

signupButton.addEventListener("click", async () => {
    const id = document.querySelector("#id").value;
    const password = document.querySelector("#password").value;
    const userName = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const uri = "http://localhost:5500/auth/signup";
    const userData = {
        userId: id,
        password: password,
        userName: userName,
        email: email,
    };

    await axios
        .post(uri, userData)
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
