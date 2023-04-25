const prices = document.querySelectorAll('.price');
const orderPrice = document.querySelector('.order-price');
const chevron = document.querySelectorAll('.fa-chevron-down');

const form = document.getElementById('form');
const esseatialInput = document.querySelectorAll('.essential');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkAllInputs(e);
});

function checkAllInputs(e) {
    const recieverName = document.getElementById('name');
    const postcode = document.getElementById('postcode');
    const address1 = document.getElementById('address1');
    const address2 = document.getElementById('address2');
    const extraAddress = document.getElementById('extraAddress');
    const phoneNum = document.getElementById('phone-num');
    const checkBtn = document.getElementById('check-btn');

    let validateItems = [recieverName, postcode, address1, address2, phoneNum];

    let validate = validateItems.every((item) => {
        if (item.value === '') {
            alert('필수 입력 사항을 모두 작성해주세요.');
            // item.focus;
        }
        return item.value !== '';
    });

    if (validate == false) {
        console.log(validate);
        return false;
    } else if (!checkBtn.checked) {
        alert('구매 동의 항목에 체크해주세요.');
        return false;
    } else {
        console.log(e);
        window.location.href = './order_ok.html';
    }
}

let totalPrice = 0;

for (let i = 0; i < prices.length; i++) {
    const noComma = prices[i].innerHTML.replace(',', '');
    totalPrice += Number(noComma);
}

let result = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

orderPrice.innerHTML = result;

chevron[0].addEventListener('click', () => {
    let box = chevron[0].parentElement.nextSibling.nextSibling;
    if (box.style.display == 'none') {
        box.style.display = 'block';
    } else {
        box.style.display = 'none';
    }
});
chevron[1].addEventListener('click', () => {
    let box = chevron[1].parentElement.nextSibling.nextSibling;
    if (box.style.display == 'none') {
        box.style.display = 'flex';
    } else {
        box.style.display = 'none';
    }
});
chevron[2].addEventListener('click', () => {
    let box = chevron[2].parentElement.nextSibling.nextSibling;
    if (box.style.display == 'none') {
        box.style.display = 'grid';
    } else {
        box.style.display = 'none';
    }
});
