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

const getGuestOrder = async () => {
    const uri = `http://localhost:5500/ 회식하고싶다.`;

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
        // localStorage.setItem('')
        modalContent.innerText = "통신성공"
        openModal();
    } catch(err) {
        console.log(err);
        modalContent.innerText = "에러지롱~";
        openModal();
    }
}

nextBtn.addEventListener('click', getGuestOrder);



