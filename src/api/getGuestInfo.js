const nextBtn = document.querySelector('#next_btn');
const guestEmail = document.querySelector('#email');
const guestPassword = document.querySelector('#password');

//모달
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-text");
const closeModalBtn = document.querySelector(".close-modal-btn");

function openModal() {
    modal.classList.add("active");
    setTimeout(() => {
        modal.classList.remove("active");
    }, 2000);
}
closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});


/* [ 비회원 ] 주문조회 */
// 데이터 저장
const saveData = (key, value, expirationMinutes) => {
  const expirationMS = expirationMinutes * 60 * 1000;
  const expirationTime = Date.now() + expirationMS;
  const data = {
    value: value,
    expirationTime: expirationTime,
  };
  localStorage.setItem(key, JSON.stringify(data));
};

const getMyAllOrdersForGuest = async () => {
    const uri = `https://www.eladin.store/orders/guest`;

    const header = {
        headers: {
            "Cotent-type": "application/json",
        },
        withCredentials: true,
    };

    const body = {
        email: guestEmail.value,
        password: guestPassword.value,
    }
    console.log(body);
    try {
        const response = await axios.post(uri, body, header);
        console.log(response);
        saveData("guestOrder", response.data.data, 5); // 5분 후에 데이터 만료
        location.href = "./guest_orderinfo.html";  
    } catch(err) {
        console.log(err);
        if(err.response.status === 400){
            modalContent.innerText = "이메일과 비밀번호를 다시 확인해주세요!";
            openModal();
        } else {
            modalContent.innerText = `${err.response.data.message}`;
            openModal();
        }
    }
}

nextBtn.addEventListener('click', getMyAllOrdersForGuest);



