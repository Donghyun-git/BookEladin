const nextButton = document.querySelector("#next_btn");

//모달
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-text");
const closeModalBtn = document.querySelector(".close-modal-btn");

const NonMemberlogIn = async () => {
    //input value값(공백 제거)
    const email = document.querySelector("#email").value.trim();
    const userName = document.querySelector("#name").value.trim();
    const password = document.querySelector("#password").value.trim();

    const uri = "http://www.eladin.store/auth/loginNonMember";
    const loginData = {
        email: email,
        userName: userName,
        password: password,
    };
    const header = {
        headers: {
            "Content-type": "application/json",
        },
    };
    try {
        const response = await axios.post(uri, loginData, header);
        const { data } = await response;
        console.log(response);
        const { uuid } = data.data;
        console.log(uuid);
        localStorage.setItem("uuid", uuid);
        // window.alert(`${data.message}`);
        modalContent.innerHTML = `${data.message}`;
        openModal();
        setTimeout(() => {
            location.href = "../pages/order.html";
        }, 2000);

        closeModalBtn.addEventListener("click", () => {
            location.href = "../pages/order.html";
        });
    } catch (err) {
        if (err.response.status === 500) {
            // window.alert("이미 등록되어 있는 닉네임 입니다!");
            modalContent.innerHTML = "이미 등록되어 있는 닉네임 입니다!";
            openModal();
        } else if (err.response.data.message) {
            // window.alert(`${err.response.date.message}`);
            modalContent.innerHTML = `${err.response.data.message}`;
            openModal();
        } else {
            // window.alert('로그인에 실패했습니다!');
            modalContent.innerHTML = "로그인에 실패했습니다!";
            openModal();
        }
    }
    
};

nextButton.addEventListener("click", NonMemberlogIn);

// 모달
function openModal() {
    modal.classList.add("active");
    setTimeout(() => {
        modal.classList.remove("active");
    }, 2000);
}
closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});


/* validCHeck filed */

const passwordCheck = document.querySelector('.check-pw small');

const emailField = document.querySelector("#email");
const userNameField = document.querySelector("#name");
const passwordField = document.querySelector("#password");
const checkPassword = document.querySelector("#check-password");

/* 이메일 유효성 검사 */
const isValidEmail = (email) => {
    const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regExp.test(email);
};

emailField.addEventListener("input", async (e) => {
    console.log("텍스트 상자에 포커스가 있습니다.");
    const isValid = isValidEmail(emailField.value);
    const logInEmailArea = document.querySelector(".login-email");
    const emailFieldText = document.querySelector(".login-email small");

    if (isValid) {
        logInEmailArea.classList.remove("red");
        try {
            const userEmail = emailField.value;

            const uri = `http://www.eladin.store/auth/check-email/${userEmail}`;
            const header = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await axios.get(uri, header);
            console.log(response);
            if (response.data.data) {
                logInEmailArea.classList.add("red");
                logInEmailArea.classList.remove("green");
                emailFieldText.innerText = "누군가가 사용하고 있어요.";
            } else {
                logInEmailArea.classList.add("green");
                logInEmailArea.classList.remove("red");
                emailFieldText.innerText = `사용할 수 있는 이메일이네요!`;
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        if (emailField.value == "") {
            logInEmailArea.classList.remove("green");
            logInEmailArea.classList.add("red");
            emailFieldText.innerText = "이메일을 입력해주세요.";
        } else {
            logInEmailArea.classList.remove("green");
            logInEmailArea.classList.add("red");
            emailFieldText.innerText = "이메일 형식에 맞게 적어주세요!";
        }
    }
});

/* 닉네임 중복 검사 */
const isValidUserName = (userName) => {
    const regExp = /^[가-힣ㅣa-zA-Z0-9]{3,}$/;
    return regExp.test(userName);
};

userNameField.addEventListener("input", async (e) => {
    console.log("텍스트 상자에 포커스가 있습니다.");
    const userNameArea = document.querySelector(".login-name");
    const userNameFieldText = document.querySelector(".login-name small");
    const isValid = isValidUserName(userNameField.value);

    if (isValid) {
        userNameArea.classList.remove("red");
        try {
            const userName = userNameField.value;

            const uri = `http://www.eladin.store/auth/check-username/${userName}`;
            const header = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await axios.get(uri, header);
            console.log(response);
            if (response.data.data) {
                userNameArea.classList.add("red");
                userNameArea.classList.remove("green");
                userNameFieldText.innerText = "누군가가 사용하고 있어요.";
            } else {
                userNameArea.classList.add("green");
                userNameArea.classList.remove("red");
                userNameFieldText.innerText = `멋진 닉네임이네요!`;
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        if (userNameField.value == "") {
            userNameArea.classList.remove("green");
            userNameArea.classList.add("red");
            userNameFieldText.innerText = "닉네임을 입력해주세요.";
        } else {
            userNameArea.classList.remove("green");
            userNameArea.classList.add("red");
            userNameFieldText.innerText = "영문, 숫자, 글자 단위로 3글자 이상 입력해주세요!";
        }
    }
});

/* 패스워드 유효성 검사 */
const isValidPassword = (password) => {
    const regExp = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/;
    return regExp.test(password);
};

passwordField.addEventListener("input", async (e) => {
    console.log("텍스트 상자에 포커스가 있습니다.");
    const passwordArea = document.querySelector(".login-pw");
    const passwordFieldText = document.querySelector('.login-pw small');
    const isValid = isValidPassword(passwordField.value);

    if (isValid) {
        passwordArea.classList.remove("red");
        passwordArea.classList.add("green");
        passwordFieldText.innerText = "사용할 수 있는 비밀번호에요!";
    } else {
        if (passwordField.value == "") {
            passwordArea.classList.remove("green");
            passwordArea.classList.add("red");
            passwordFieldText.innerText = "비밀번호를 입력해주세요";
        } else {
            passwordArea.classList.remove("green");
            passwordArea.classList.add("red");
            passwordFieldText.innerText = "8~16자 영문, 숫자를 사용하세요.";
        }
    }
});

/* 패스워드 확인 유효성 검사 */
const isValidPasswordCheck = (checkPassword) => {
    return passwordField.value === checkPassword;
};

checkPassword.addEventListener("input", async (e) => {
    console.log("텍스트 상자에 포커스가 있습니다.");
    const checkPasswordArea = document.querySelector(".check-pw");
    const checkPasswordFieldText = document.querySelector(".check-pw small");
    const isValid = isValidPasswordCheck(checkPassword.value);

    if (isValid) {
        checkPasswordArea.classList.remove("red");
        checkPasswordArea.classList.add("green");
        checkPasswordFieldText.innerText = "비밀번호가 일치해요!";
    } else {
        checkPasswordArea.classList.remove("green");
        checkPasswordArea.classList.add("red");
        checkPasswordFieldText.innerText = "비밀번호가 일치하지 않습니다.";
}
});
