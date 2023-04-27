const signupButton = document.querySelector("#signup-btn");

//모달
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-text");
const closeModalBtn = document.querySelector(".close-modal-btn");

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

    if (password === "") {
        setErrorFor(passwordInput, "비밀번호를 입력하세요.");
    } else if (!regul1.test(password)) {
        setErrorFor(passwordInput, "8~16자 영문, 숫자를 사용하세요.");
    } else if (checkPassword === "") {
        setErrorFor(checkPasswordInput, "비밀번호를 입력하세요.");
        setErrorFor(passwordInput, "8~16자 영문, 숫자를 사용하세요.");
    } else if (checkPassword === "") {
        setErrorFor(checkPasswordInput, "비밀번호를 입력하세요.");
    } else if (password !== checkPassword) {
        setErrorFor(checkPasswordInput, "비밀번호가 일치하지 않습니다.");
    } else {
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
                "Content-type": "application/json",
            },
        };

        await axios
            .post(uri, userData, header)
            .then((res) => {
                console.log(res);
                // window.alert(`${res.data.message}`);
                modalContent.innerHTML = `${res.data.message}`;
                openModal();
                setTimeout(() => {
                    location.href = "./login.html";
                }, 2000);
                closeModalBtn.addEventListener("click", () => {
                    location.href = "./login.html";
                });

                // window.location.href = "./login.html";
            })
            .catch((err) => {
                if (err.response.data.message) {
                    // window.alert(`${err.response.data.message}`);
                    modalContent.innerHTML = `${err.response.data.message}`;
                    openModal();
                } else {
                    // window.alert("회원가입에 실패했습니다!");
                    modalContent.innerHTML = "회원가입에 실패했습니다!";
                    openModal();
                }
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

/* 아이디 유효성 검사 api */

const isValidId = (id) => {
    const regExp = /^[a-zA-Z0-9]{5,}$/;
    return regExp.test(id);
};

const emailField = document.querySelector("#email");
const idField = document.querySelector("#id");
const userNameField = document.querySelector("#name");

idField.addEventListener("input", async (e) => {
    console.log("텍스트 상자에 포커스가 있습니다.");
    const isValid = isValidId(idField.value);
    const signUpIdArea = document.querySelector(".signup-id");
    const idFieldText = document.querySelector(".signup-id small");

    if (isValid) {
        signUpIdArea.classList.remove("red");
        try {
            const userId = idField.value;

            const uri = `http://localhost:5500/auth/check-userid/${userId}`;
            const header = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await axios.get(uri, header);
            console.log(response);
            if (response.data.data) {
                signUpIdArea.classList.add("red");
                signUpIdArea.classList.remove("green");
                idFieldText.innerText = "누군가가 사용하고 있어요.";
            } else {
                signUpIdArea.classList.add("green");
                signUpIdArea.classList.remove("red");
                idFieldText.innerText = `멋진 아이디네요!`;
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        if (idField.value == "") {
            signUpIdArea.classList.remove("green");
            signUpIdArea.classList.add("red");
            idFieldText.innerText = "아이디를 입력해주세요.";
        } else {
            signUpIdArea.classList.remove("green");
            signUpIdArea.classList.add("red");
            idFieldText.innerText =
                "영어와 숫자로 이루어진 5글자 이상 적어주세요.";
        }
    }
});

/* 이메일 유효성 검사 */
const isValidEmail = (email) => {
    const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regExp.test(email);
};

emailField.addEventListener("input", async (e) => {
    console.log("텍스트 상자에 포커스가 있습니다.");
    const isValid = isValidEmail(emailField.value);
    const signUpEmailArea = document.querySelector(".signup-email");
    const emailFieldText = document.querySelector(".signup-email small");

    if (isValid) {
        signUpEmailArea.classList.remove("red");
        try {
            const userEmail = emailField.value;

            const uri = `http://localhost:5500/auth/check-email/${userEmail}`;
            const header = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await axios.get(uri, header);
            console.log(response);
            if (response.data.data) {
                signUpEmailArea.classList.add("red");
                signUpEmailArea.classList.remove("green");
                emailFieldText.innerText = "누군가가 사용하고 있어요.";
            } else {
                signUpEmailArea.classList.add("green");
                signUpEmailArea.classList.remove("red");
                emailFieldText.innerText = `사용할 수 있는 이메일이네요!`;
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        if (emailField.value == "") {
            signUpEmailArea.classList.remove("green");
            signUpEmailArea.classList.add("red");
            emailFieldText.innerText = "이메일을 입력해주세요.";
        } else {
            signUpEmailArea.classList.remove("green");
            signUpEmailArea.classList.add("red");
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
    const userNameArea = document.querySelector(".signup-name");
    const userNameFieldText = document.querySelector(".signup-name small");
    const isValid = isValidUserName(userNameField.value);

    if (isValid) {
        userNameArea.classList.remove("red");
        try {
            const userName = userNameField.value;

            const uri = `http://localhost:5500/auth/check-username/${userName}`;
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
            userNameFieldText.innerText =
                "영문, 숫자, 글자 단위로 3글자 이상 입력해주세요!";
        }
    }
});
