const form = document.getElementById("form");
const id = document.getElementById("id");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const username = document.getElementById("name");
const email = document.getElementById("email");
const signupBtn = document.getElementById("signup-btn");

const inputList = form.querySelectorAll("input");

inputList.forEach((input) => {
    input.addEventListener("keyup", () => {
        checkInputs(input);
    });
    input.addEventListener("blur", () => {
        checkInputs(input);
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkAllInputs(e);
});

function checkInputs(input) {
    const idValue = id.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
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
    } else if (input === password2) {
        if (password2Value === "") {
            setErrorFor(password2, "비밀번호를 입력하세요.");
        } else if (passwordValue !== password2Value) {
            setErrorFor(password2, "비밀번호가 일치하지 않습니다.");
        } else {
            setSuccessFor(password2);
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

function checkAllInputs(e) {
    const idValue = id.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const nameValue = username.value.trim();
    const emailValue = email.value.trim();

    const regul1 = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/;
    const regul2 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (idValue === "") {
        setErrorFor(id, "아이디를 입력하세요.");
    } else if (passwordValue === "") {
        setErrorFor(password, "비밀번호를 입력하세요.");
    } else if (!regul1.test(passwordValue)) {
        setErrorFor(password, "8~16자 영문, 숫자를 사용하세요.");
    } else if (password2Value === "") {
        setErrorFor(password2, "비밀번호를 입력하세요.");
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, "비밀번호가 일치하지 않습니다.");
    } else if (nameValue === "") {
        setErrorFor(username, "성함을 입력하세요.");
    } else if (emailValue === "") {
        setErrorFor(email, "이메일을 입력하세요.");
    } else if (!regul2.test(emailValue)) {
        setErrorFor(email, "이메일 주소를 다시 확인해주세요");
    } else {
        console.log("success");
    }
}

function setErrorFor(input, message) {
    const inputFormDiv = input.parentElement;
    const small = inputFormDiv.querySelector("small");

    small.innerText = message;
    inputFormDiv.classList.remove("success");
    inputFormDiv.classList.add("error");
    return false;
}

function setSuccessFor(input) {
    const inputFormDiv = input.parentElement;
    inputFormDiv.classList.remove("error");
    inputFormDiv.classList.add("success");
}
