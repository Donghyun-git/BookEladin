//모달
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-text");
const closeModalBtn = document.querySelector(".close-modal-btn");

if (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("uuid")
) {
    const logoutButton = document.querySelector("#logout-button");

    const logOut = async () => {
        const token = localStorage.getItem("accessToken");
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        };

        try {
            const uri = "http://34.64.105.163:80/auth/logout";
            const logoutResponse = await axios.delete(uri, header);
            const logoutMessage = logoutResponse.data;
            localStorage.clear();
            // window.alert(`${logoutMessage.message}`);
            // window.location.href = "./index.html";

            modalContent.innerHTML = `${logoutMessage.message}`;
            openModal();
            setTimeout(() => {
                location.href = "./index.html";
            }, 1000);
            closeModalBtn.addEventListener("click", () => {
                location.href = "./index.html";
            });
        } catch (err) {
            console.log(err);
        }
    };
    logoutButton.addEventListener("click", logOut);
}

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
