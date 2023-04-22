// mypage 로고 누를 시 마이페이지 출력하기 위한 로직

const myPage = document.querySelector(".header-info-my");

myPage.addEventListener("click", async (e) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        e.preventDefault();
        window.alert("로그인 후에 이용해주세요!");
        window.location.href = "./login.html";
    } else {
        //마이페이지 렌더링... 진행중..
        window.alert('4.23 일어나서 할예정');
    }
});
