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
            const uri = "http://34.64.105.163/auth/logout";
            const logoutResponse = await axios.delete(uri, header);
            const logoutMessage = logoutResponse.data;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("myData");
            localStorage.removeItem("userData");
            window.alert(`${logoutMessage.message}`);
            window.location.href = "../index.html";
        } catch (err) {
            console.log(err);
        }
    };
    logoutButton.addEventListener("click", logOut);
}
