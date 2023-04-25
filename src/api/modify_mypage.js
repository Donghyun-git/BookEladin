const updateButton = document.querySelector(".change-user-info");

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
        window.alert("이메일 형식이 올바르지 않습니다!");
    } else if (!isMatchPassword(password, checkPassword)) {
        password.style.outline = inValidOutlineStyle;
        checkPassword.style.outline = inValidOutlineStyle;
        window.alert(
            "패스워드 형식이 올바르지 않습니다! 일치여부도 다시 한 번 확인해주세요!"
        ); // 여기부분까지만 건드려주세용.
    } else {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const userId = JSON.parse(localStorage.getItem('userData')).userId;
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
            const uri = "http://34.64.105.163:80/auth/me";

            const updateResponse = await axios.patch(uri, body, header);
            const updateMessage = await updateResponse.data.message;
            localStorage.setItem("myData", JSON.stringify({ userName: body.userName, email: body.email, userId: userId })); // 백 데이터 넘겨주는거 변경됐을 때 풀기.
            window.alert(updateMessage);
            window.location.href = "./mypage.html";
        } catch (err) {
            console.log(err);
            window.alert(`서버오류입니다! ${err.response.data.message}`)
        }
    }
};

updateButton.addEventListener("click", updateUserInfo);
