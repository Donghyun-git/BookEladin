import API from '../api/rest.js'
import IDB from './indexedDB.js';

const chevron = document.querySelectorAll('.fa-chevron-down');
const form = document.getElementById('form');
const esseatialInput = document.querySelectorAll('.essential');
const List = document.querySelector('.product-list');

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

class OrderList {

    constructor(target) {
        this.target = target;
        this.order;
    }

    async setOrder() {
        this.order = await IDB.getAllIDB();
        console.log(this.order);
    }

    async template() {
        await this.setOrder()
        const orderList = this.order;
        
        let template = '';
        orderList.map((order) => {
            template += `
                <section class="product-detail">
                    <img
                        class="cover"
                        src="${order.url}"
                        alt="example_cover"
                    />
                    <div class="book-detail">
                        <p class="title">${order.title}</p>
                        <p class="author">
                            ${order.authors}
                        </p>
                    </div>
                    <p class="price">${order.price}</p>
                </section>
            `
        })
        return template;
    }

    async totalPrice() {
        let total = 0;
        const orderPrice = document.querySelector('.order-price')
        await this.order.map((o) => {
            total += Number(o.price)
        })

        orderPrice.innerText = total;
    }

    async render() {
        const template = await this.template()

        this.target.innerHTML = template;
        this.totalPrice();
    }
}

class OrderForm {

    constructor(form) {
        this.form = form
        this.state = []
    }

    setState() {
        this.state = [];
        esseatialInput.forEach((tag) => {
            this.state.push(tag.value)
        })
    }

    validate() {
        this.setState();
        const checkBtn = document.getElementById('check-btn');

        for(let idx = 0; idx < this.state.length - 1; idx++) {
            if (this.state[idx] === '') {
                alert('필수 입력 사항을 모두 작성해주세요.');
                
                throw new Error('필수 입력 사항을 모두 작성해주세요.')
            }
        }

        if (checkBtn.checked === false) {
            alert('구매 동의 항목에 체크해주세요.')

            throw new Error('구매 동의 항목에 체크해주세요')
        }

        return true;
    }

    addEvent() {
        this.form.addEventListener('click', (e) => {
            if (e.target.classList.contains('purchase-btn')) {
                try {
                    this.validate();
                    this.postDeliveryInfo();
                } catch(err) {
                    return err
                }
            }
        })
    }

    async orderIDB() {
        const data = await IDB.getAllIDB();
        
        console.log(data);
    }

    async postDeliveryInfo() {
        const data = {
            receiverName: this.state[0],
            postCode: this.state[1],
            address: this.state[2],
            addressDetail: this.state[3],
            receiverPhone: this.state[4],
            deliveryMessage: this.state[5],
        }
        API.post('http://localhost:3000/item', data)
    }

    render() {
        this.addEvent();
    }
}

const orderList = new OrderList(List)
orderList.render();

const orderForm = new OrderForm(form) 
orderForm.orderIDB();
orderForm.render();

// for (let i = 0; i < prices.length; i++) {
//     const noComma = prices[i].innerHTML.replace(',', '');
//     totalPrice += Number(noComma);
// }

// let result = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
