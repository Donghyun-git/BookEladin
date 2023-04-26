if (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("refreshToken")
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
            const uri = "http://localhost:5500/auth/logout";
            const logoutResponse = await axios.delete(uri, header);
            const logoutMessage = logoutResponse.data;
            localStorage.clear();
            window.alert(`${logoutMessage.message}`);
            window.location.href = "../index.html";
        } catch (err) {
            console.log(err);
        }
    };
    logoutButton.addEventListener("click", logOut);
}
