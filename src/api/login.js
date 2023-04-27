const loginButton = document.querySelector("#login_btn");

//모달
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-text");
const closeModalBtn = document.querySelector(".close-modal-btn");

const logIn = async () => {
    const id = document.querySelector("#id").value;
    const password = document.querySelector("#password").value;
    const uri = "http://localhost:5500/auth/login";
    const loginData = {
        userId: id,
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
        const { accessToken, refreshToken } = data.data;
        localStorage.setItem("userData", JSON.stringify(data.data));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        modalContent.innerHTML = `${data.message}`;
        openModal();
        setTimeout(() => {
            location.href = "../index.html";
        }, 2000);
        closeModalBtn.addEventListener("click", () => {
            location.href = "../index.html";
        });

        // window.alert(`${data.message}`);
        // window.location.href = "../index.html";
    } catch (err) {
        if (err.response.data.message) {
            // window.alert(`${err.response.data.message}`);
            modalContent.innerHTML = `${err.response.data.message}`;
            openModal();
        } else {
            // window.alert("로그인에 실패했습니다!");
            modalContent.innerHTML = "로그인에 실패했습니다!";
            openModal();
        }
    }
};

loginButton.addEventListener("click", logIn);

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
