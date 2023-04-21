// mypage 로고 누를 시 마이페이지 출력하기 위한 로직

const myPage = document.querySelector(".header-info-my");

myPage.addEventListener("click", async (e) => {
    const token = localStorage.getItem("token");

    if (!token) {
        e.preventDefault();
        window.alert("로그인 후에 이용해주세요!");
        window.location.href = "/login";
    } else {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const myResponse = await axios.get("/mypage", header);
        const myData = myResponse.data;

        localStorage.setItem("mypage", JSON.stringify(myData)); //마이페이지 버튼을 눌러 가져온 데이터를 로컬스토리지 저장. 후에 마이페이지 렌더링할 때 사용.
    }
});
