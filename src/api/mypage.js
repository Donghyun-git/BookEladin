// mypage 로고 누를 시 마이페이지 출력하기 위한 로직
const myPage = document.querySelector(".header-info-my");

const getUserInfo = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        e.preventDefault();
        window.alert("로그인 후에 이용해주세요!");
        window.location.href = "./login.html";
    } else {
        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const userId = userData.userId;
            const header = accessToken
                ? {
                      headers: {
                          Authorization: `Bearer ${accessToken}`,
                      },
                      withCredentials: true,
                  }
                : { withCredentials: true };
            const uri = `http://localhost:5500/auth/users/${userId}`;

            const myPageResponse = await axios.get(uri, header);
            const myPageData = myPageResponse.data;

            localStorage.setItem("myData", JSON.stringify(myPageData));
            window.location.href = "./mypage.html";
        } catch (err) {
            console.log(err);
        }
    }
};

myPage.addEventListener("click", getUserInfo);


/* 비회원, 게스트 마이페이지 링크 x */

const blockMoveToMypqge = async () => {
    if(localStorage.getItem('uuid') || !localStorage.getItem('accessToken')){
        window.alert('비회원이나 게스트는 이용하실 수 없습니다!')
    }
}








