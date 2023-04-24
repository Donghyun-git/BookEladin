const signupButton = document.querySelector("#signup-btn");

const signUp = async () => {
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
    const header = {
        headers: {
            "Content-type": "application/json",
        },
    };

    await axios
        .post(uri, userData, header)
        .then((res) => {
            console.log(res);
            window.alert(`${res.data.message}`);
            window.location.href = "./login.html";
        })
        .catch((err) => {
            if(err.response.data.message){
                window.alert(`${err.response.data.message}`);
            } else {
                window.alert("회원가입에 실패했습니다!");
            }
        });
};

signupButton.addEventListener("click", signUp);
