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
        console.log(data);
        window.alert(`${data.message}`);
        window.location.href = "../index.html";
    } catch (err) {
        console.log(err);
    }
});
