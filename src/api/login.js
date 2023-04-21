// 1.서버로 로그인 post 요청을 보내면 보낸 body 정보가 db와 대조하여 일치할 시 토큰발급.
// 2. 토큰 localStorage 저장.

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
    const token = await response.data.token;
    localStorage.setItem("token", token); // 토큰 localStorage에 저장
    window.alert(`${response.data.message}`);
    
    const mainResponse = await axios.get("/main", { headers: { Authorization: `Bearer ${token}` } }); // 라우트 경로 변경 예정
    const mainData = await mainResponse.data; // 이 데이터 가지고 로그인 후 메인페이지 데이터 뿌리기.

  } catch (err) {
    window.alert(`${err.response.data.message}`);
  }
});
