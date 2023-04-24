const loginButton = document.querySelector('#login_btn');

const logIn = async () => {
    const id = document.querySelector('#id').value;
    const password = document.querySelector('#password').value;
    const uri = 'http://localhost:5500/auth/login';
    const loginData = {
        userId: id,
        password: password,
    };
    const header = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    try {
        const response = await axios.post(uri, loginData, header);
        const { data } = await response; // 님 뭐함?
        // 거울치료 =>  let a = await 1  << 이거랑똑같은거임 간지 ㄷㄷ
        console.log(response);
        const { accessToken, refreshToken } = data.data;
        localStorage.setItem('userData', JSON.stringify(data.data));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        console.log(data);
        window.alert(`${data.message}`);
        window.location.href = '../index.html';
    } catch (err) {
        if (err.response.data.message) {
            window.alert(`${err.response.data.message}`);
        } else {
            window.alert('로그인에 실패했습니다!');
        }
    }
};

loginButton.addEventListener('click', logIn);
