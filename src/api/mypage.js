// mypage 로고 누를 시 마이페이지 출력하기 위한 로직
const myPage = document.querySelector(".header-info-my");

myPage.addEventListener("click", async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken) {
        e.preventDefault();
        window.alert("로그인 후에 이용해주세요!");
        window.location.href = "./login.html";
    } else {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const userId = userData.userId;
            const header = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCrential:true,
            };

            const uri = `http://localhost:5500/auth/users/${userId}`;

            const myPageResponse = await axios.get(uri, header);
            const myPageData = myPageResponse.data;
            localStorage.setItem("myData", JSON.stringify(myPageData));
            window.location.href = "./mypage.html";
        } catch (err) {
            console.log(err);
        }
    }
});
