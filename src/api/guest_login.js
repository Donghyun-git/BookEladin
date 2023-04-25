const nextButton = document.querySelector("#next_btn");

nextButton.addEventListener("click", async () => {
    //input value값(공백 제거)
    const email = document.querySelector("#email").value.trim();
    const userName = document.querySelector("#name").value.trim();
    const password = document.querySelector("#password").value.trim();
    const checkPassword = document
        .querySelector("#check-password")
        .value.trim();

    console.log(email);
    // 유효성검사용 정규표현식
    const regul1 = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/;
    const regul2 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (email === "") {
        console.log(email);
        setErrorFor("이메일을 입력하세요.");
    } else if (!regul2.test(email)) {
        setErrorFor("이메일 주소를 다시 확인해주세요");
        alert("이메일 형식이 올바르지 않습니다.");
    } else if (userName === "") {
        setErrorFor("성함을 입력하세요.");
    } else if (password === "") {
        setErrorFor("비밀번호를 입력하세요.");
    } else if (!regul1.test(password)) {
        setErrorFor("8~16자 영문, 숫자를 사용하세요.");
    } else if (checkPassword === "") {
        setErrorFor("비밀번호 확인을 입력해주세요.");
    } else if (password !== checkPassword) {
        setErrorFor("비밀번호가 일치하지 않습니다.");
    } else {
        // 여기에 통신로직 작성
    }
});

function setErrorFor(message) {
    const small = document.querySelector("small");
    small.style.visibility = "visible";
    small.innerText = message;
}
