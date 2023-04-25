const loginButton = document.querySelector('#login_btn');

const logIn = async () => {
    const id = document.querySelector('#id').value;
    const password = document.querySelector('#password').value;
    const uri = 'http://34.64.105.163/auth/login';
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
        const { data } = await response; 
        console.log(response);
        const { accessToken, refreshToken } = data.data;
        localStorage.setItem('userData', JSON.stringify(data.data));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
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
