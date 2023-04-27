const nextButton = document.querySelector('#next_btn');

const NonMemberlogIn = async () => {
    //input value값(공백 제거)
    const email = document.querySelector('#email').value.trim();
    const userName = document.querySelector('#name').value.trim();
    const password = document.querySelector('#password').value.trim();
    const checkPassword = document
        .querySelector('#check-password')
        .value.trim();

    // 유효성검사용 정규표현식
    const regul1 = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/;
    const regul2 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (email === '') {
        console.log(email);
        setErrorFor('이메일을 입력하세요.');
    } else if (!regul2.test(email)) {
        setErrorFor('이메일 주소를 다시 확인해주세요');
        alert('이메일 형식이 올바르지 않습니다.');
    } else if (userName === '') {
        setErrorFor('성함을 입력하세요.');
    } else if (password === '') {
        setErrorFor('비밀번호를 입력하세요.');
    } else if (!regul1.test(password)) {
        setErrorFor('8~16자 영문, 숫자를 사용하세요.');
    } else if (checkPassword === '') {
        setErrorFor('비밀번호 확인을 입력해주세요.');
    } else if (password !== checkPassword) {
        setErrorFor('비밀번호가 일치하지 않습니다.');
    } else {
        const uri = 'http://localhost:5500/auth/loginNonMember';
        const loginData = {
            email: email,
            userName: userName,
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
            const { uuid } = data.data;
            console.log(uuid);
            localStorage.setItem('uuid', uuid);
            window.alert(`${data.message}`);
            window.location.href = '../pages/order.html';
        } catch (err) {
            if (err.response.status === 500) {
                window.alert("이미 등록되어 있는 닉네임 입니다!");
            } else if(err.response.data.message){
                window.alert(`${err.response.date.message}`);
            } else {
                window.alert('로그인에 실패했습니다!');
            }
        }
    }
};

function setErrorFor(message) {
    const small = document.querySelector('small');
    small.style.visibility = 'visible';
    small.innerText = message;
}

nextButton.addEventListener('click', NonMemberlogIn);
