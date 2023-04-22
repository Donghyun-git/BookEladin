const logOut = document.querySelector("#logout-button");

logOut.addEventListener("click", async () => {
  const token = localStorage.getItem("accessToken");
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const logoutResponse = await axios.post("/logout", null, header); //바디에 뭘 담아 보내야될까요..? 마이페이지에 들어가는 유저정보?
    const logoutMessage = await logoutResponse.data;
    localStorage.clear();
    window.alert(`${logoutMessage.message}`);
    window.location.href = "/";
  } catch (err) {
    window.alert(`${err.response.data.message}`);
  }
});
