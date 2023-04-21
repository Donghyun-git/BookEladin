const logOut = document.querySelector("#logout-button");

logOut.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const logoutResponse = await axios.post("/logout", null, header);
    const logoutMessage = await logoutResponse.data;
    localStorage.removeItem("token");
    window.alert(`${logoutMessage.message}`);
    window.location.href = "/";
  } catch (err) {
    window.alert(`${err.response.data.message}`);
  }
});
