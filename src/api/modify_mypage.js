const updateButton = document.querySelector(".change-user-info");

// //모달
// const modal = document.querySelector(".modal");
// const modalContent = document.querySelector(".modal-text");
// const closeModalBtn = document.querySelector(".close-modal-btn");

const isMatchEmail = (email) => {
    const deleteSpace = email.value.trim();
    if (deleteSpace.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) return true;
    return false;
};

const isMatchPassword = (password, checkPassword) => {
    const deleteSpacePassword = password.value.trim();
    const deleteSpaceCheckPassword = checkPassword.value.trim();
    if (
        deleteSpacePassword.match(/^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/) &&
        deleteSpacePassword === deleteSpaceCheckPassword
    )
        return true;

    return false;
};

const updateUserInfo = async () => {
    const userName = document.querySelector(".change-username");
    const email = document.querySelector(".change-email");
    const password = document.querySelector("#new-password");

    const checkPassword = document.querySelector("#new-password-check");

    const inValidOutlineStyle = "2px solid red";

    if (!isMatchEmail(email)) {
        email.style.outline = inValidOutlineStyle;
        // window.alert("이메일 형식이 올바르지 않습니다!");
        modalContent.innerHTML = "이메일 형식이 올바르지 않습니다!";
        openModal();
    } else if (!isMatchPassword(password, checkPassword)) {
        password.style.outline = inValidOutlineStyle;
        checkPassword.style.outline = inValidOutlineStyle;
        // window.alert("패스워드 형식이 올바르지 않습니다! 일치여부도 다시 한 번 확인해주세요!");

        modalContent.innerHTML =
            "패스워드 형식이 올바르지 않습니다! 일치여부도 다시 한 번 확인해주세요!";
        openModal();

        // 여기부분까지만 건드려주세용. +요기는 비번이랑 비번확인 체크가 같이 있고, 클릭이벤트 핸들러라서 아래에다가 작성했어용.
    } else {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const userId = JSON.parse(localStorage.getItem("userData")).userId;
            const header = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            };
            const body = {
                userName: userName.value.trim(),
                password: password.value,
                email: email.value,
            };
            const uri = "https://www.eladin.store/auth/me";
            const updateResponse = await axios.patch(uri, body, header);
            const updateMessage = await updateResponse.data.message;
            localStorage.setItem(
                "myData",
                JSON.stringify({
                    data: {
                        userName: body.userName,
                        email: body.email,
                        userId: userId,
                    },
                })
            );
            modalContent.innerHTML = `${updateMessage}`;
            openModal();

            setTimeout(() => {
                location.href = "./mypage.html";
            }, 2000);
            closeModalBtn.addEventListener("click", () => {
                location.href = "./mypage.html";
            });

        } catch (err) {
            console.log(err);
            modalContent.innerHTML = `${err.response.data.message}`;
            openModal();
        }
    }
};

updateButton.addEventListener("click", updateUserInfo);

//이메일, 비밀번호 유효성 검사(타자칠 때, 포커스 나갔을 때)

const password = document.querySelector("#new-password");
const checkPassword = document.querySelector("#new-password-check");

const inputList = [password, checkPassword];

inputList.forEach((input) => {
    input.addEventListener("keyup", () => {
        checkInputs(input);
    });
    input.addEventListener("blur", () => {
        checkInputs(input);
    });
});

function checkInputs(input) {
    const passwordValue = password.value.trim();
    const checkPasswordValue = checkPassword.value.trim();

    const regul1 = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/; // 패스워드
    if (input === password) {
        if (passwordValue === "") {
            setErrorFor(password, "비밀번호를 입력하세요.");
        } else if (!regul1.test(passwordValue)) {
            setErrorFor(password, "8~16자 영문, 숫자를 사용하세요.");
        } else {
            setSuccessFor(password);
        }
    } else if (input === checkPassword) {
        if (checkPasswordValue === "") {
            setErrorFor(checkPassword, "비밀번호를 입력하세요.");
        } else if (passwordValue !== checkPasswordValue) {
            setErrorFor(checkPassword, "비밀번호가 일치하지 않습니다.");
        } else {
            setSuccessFor(checkPassword);
        }
    }
}

function setErrorFor(input, message) {
    const inputFormDiv = input.parentElement;
    const small = inputFormDiv.querySelector("small");

    small.innerText = message;
    inputFormDiv.classList.remove("success");
    inputFormDiv.classList.add("error");
}

function setSuccessFor(input) {
    const inputFormDiv = input.parentElement;
    inputFormDiv.classList.remove("error");
    inputFormDiv.classList.add("success");
}

/* 이메일 유효성 검사 */
const emailArea = document.querySelector(".email-field");
const emailField = document.querySelector(".change-email");

const isValidEmail = (email) => {
    const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regExp.test(email);
};

emailField.addEventListener("input", async (e) => {
    // console.log("텍스트 상자에 포커스가 있습니다.");

    const emailValue = emailField.value.trim();
    const isValid = isValidEmail(emailValue);
    const emailFieldText = document.querySelector(".email-field small");

    if (isValid) {
        emailArea.classList.remove("red");
        try {
            const userEmail = emailField.value;

            const uri = `https://www.eladin.store/auth/check-email/${userEmail}`;
            const header = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await axios.get(uri, header);
            if (response.data.data) {
                emailArea.classList.add("red");
                emailArea.classList.remove("green");
                emailFieldText.innerText = "누군가가 사용하고 있어요.";
            } else {
                emailArea.classList.add("green");
                emailArea.classList.remove("red");
                emailFieldText.innerText = `사용할 수 있는 이메일이네요!`;
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        if (emailValue == "") {
            emailArea.classList.remove("green");
            emailArea.classList.add("red");
            emailFieldText.innerText = "이메일을 입력해주세요.";
        } else {
            emailArea.classList.remove("green");
            emailArea.classList.add("red");
            emailFieldText.innerText = "이메일 형식에 맞게 적어주세요!";
        }
    }
});

/* 닉네임 중복 검사 */

const nameArea = document.querySelector(".name-field");
const nameField = document.querySelector(".change-username");

const isValidName = (name) => {
    const regExp = /^[가-힣ㅣa-zA-Z0-9]{3,}$/;
    return regExp.test(name);
};

nameField.addEventListener("input", async (e) => {
    // console.log("텍스트 상자에 포커스가 있습니다.");

    const nameValue = nameField.value.trim();
    const isValid = isValidName(nameValue);
    const nameFieldText = document.querySelector(".name-field small");

    if (isValid) {
        nameArea.classList.remove("red");
        try {
            const userName = nameValue;

            const uri = `https://www.eladin.store/auth/check-username/${userName}`;
            const header = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await axios.get(uri, header);
            if (response.data.data) {
                nameArea.classList.add("red");
                nameArea.classList.remove("green");
                nameFieldText.innerText = "누군가가 사용하고 있어요.";
            } else {
                nameArea.classList.add("green");
                nameArea.classList.remove("red");
                nameFieldText.innerText = `멋진 닉네임이네요!`;
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        if (nameValue == "") {
            nameArea.classList.remove("green");
            nameArea.classList.add("red");
            nameFieldText.innerText = "닉네임을 입력해주세요.";
        } else {
            nameArea.classList.remove("green");
            nameArea.classList.add("red");
            nameFieldText.innerText =
                "영문, 숫자, 글자 단위로 3글자 이상 입력해주세요!";
        }
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
