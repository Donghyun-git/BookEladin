// 1. 로그인 한후 마이페이지에서 회원탈퇴 가능
// 2. 회원탈퇴 라우팅경로로 토큰이랑 필요하다면 유저정보 바디에 담아 보냄.
// 3. 회원 탈퇴 완료되면 Response 메시지 띄우고 로컬스토리지 토큰 제거, 로그인 페이지로 이동
// 4. 에러나면 에러 메시지 띄우고 페이지 이동 막고 그대로.

const deleteUser = document.querySelector(".delete-user-button");

deleteUser.addEventListener("click", async (e) => {
    const token = localStorage.getItem("token");
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    await axios
        .post("/delete", null, header) // 필요하다면 body에 정보 넘김.
        .then((res) => {
            localStorage.removeItem("token");
            window.alert(`${res.data.message}`);
            window.location.href = "/login";
        })
        .catch((err) => {
            e.preventDefault();
            window.alert(`${err.response.data.message}`);
        });
});
