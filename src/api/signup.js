const signupButton = document.querySelector("#signup-btn");

signupButton.addEventListener("click", async () => {
    //input
    const idInput = document.querySelector("#id");
    const passwordInput = document.querySelector("#password");
    const checkPasswordInput = document.querySelector("#check-password");
    const userNameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    //input value값(공백 제거)
    const id = idInput.value.trim();
    const password = passwordInput.value.trim();
    const checkPassword = checkPasswordInput.value.trim();
    const userName = userNameInput.value.trim();
    const email = emailInput.value.trim();

    // 유효성검사용 정규표현식
    const regul1 = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/;
    const regul2 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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
    if (id === "") {
        setErrorFor(idInput, "아이디를 입력하세요.");
    } else if (password === "") {
        setErrorFor(passwordInput, "비밀번호를 입력하세요.");
    } else if (!regul1.test(password)) {
        setErrorFor(passwordInput, "8~16자 영문, 숫자를 사용하세요.");
    } else if (checkPassword === "") {
        setErrorFor(checkPasswordInput, "비밀번호를 입력하세요.");
    } else if (password !== checkPassword) {
        setErrorFor(checkPasswordInput, "비밀번호가 일치하지 않습니다.");
    } else if (userName === "") {
        setErrorFor(userNameInput, "성함을 입력하세요.");
    } else if (email === "") {
        setErrorFor(emailInput, "이메일을 입력하세요.");
    } else if (!regul2.test(email)) {
        setErrorFor(emailInput, "이메일 주소를 다시 확인해주세요");
    } else {
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
    }

    function setErrorFor(input, message) {
        const inputFormDiv = input.parentElement;
        const small = inputFormDiv.querySelector("small");

        small.innerText = message;
        inputFormDiv.classList.remove("success");
        inputFormDiv.classList.add("error");
    }
});
