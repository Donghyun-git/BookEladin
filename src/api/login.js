const loginButton = document.querySelector("#login_btn");

loginButton.addEventListener("click", async () => {
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
            withCredentials: true,
        },
    };

    try {
        const response = await axios.post(uri, loginData, header);
        const { data } = await response;
        const accessToken = response.headers["authorization"].split(' ')[1];
        const refreshToken = data.refreshToken;
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        window.alert(`${data.message}`);
    } catch (err) {
        window.alert(`${err.response.data.message}`);
    }
});
