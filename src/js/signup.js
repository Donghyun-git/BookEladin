const signupArea = document.querySelector(".signup-area");

const id = document.getElementById("id");
const password = document.getElementById("password");
const checkPassword = document.getElementById("check-password");
const username = document.getElementById("name");
const email = document.getElementById("email");
const signupBtn = document.getElementById("signup-btn");

const inputList = signupArea.querySelectorAll("input"); //변경 반영
console.log(inputList);

inputList.forEach((input) => {
    input.addEventListener("keyup", () => {
        checkInputs(input);
    });
    input.addEventListener("blur", () => {
        checkInputs(input);
    });
});

function checkInputs(input) {
    const idValue = id.value.trim();
    const passwordValue = password.value.trim();
    const checkPasswordValue = checkPassword.value.trim();
    const nameValue = username.value.trim();
    const emailValue = email.value.trim();

    const regul1 = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/; // 패스워드
    const regul2 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //이메일

    if (input === id) {
        if (idValue === "") {
            setErrorFor(id, "아이디를 입력하세요.");
        } else {
            setSuccessFor(id);
        }
    } else if (input === password) {
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
    } else if (input === username) {
        if (nameValue === "") {
            setErrorFor(username, "성함을 입력하세요.");
        } else {
            setSuccessFor(username);
        }
    } else if (input === email) {
        if (emailValue === "") {
            setErrorFor(email, "이메일을 입력하세요.");
        } else if (!regul2.test(emailValue)) {
            setErrorFor(email, "이메일 주소를 다시 확인해주세요");
        } else {
            setSuccessFor(email);
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
