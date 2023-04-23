if (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("refreshToken")
) {
    const logOut = document.querySelector("#logout-button");

    logOut.addEventListener("click", async () => {
        const token = localStorage.getItem("accessToken");
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        };

        try {
            const uri = "http://localhost:5501/auth/logout";
            const logoutResponse = await axios.delete(uri, header);
            const logoutMessage = logoutResponse.data;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userData");
            window.alert(`${logoutMessage.message}`);
            window.location.href = "./index.html";
        } catch (err) {
            console.log(err);
        }
    });
}
