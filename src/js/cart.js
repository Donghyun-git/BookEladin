import IDB from "./indexedDB.js";

const cartUl = document.querySelector('.cart-section-list');
const allSelectBtn = document.querySelector('.cart-list-all-select-btn');
const allDeleteBtn = document.querySelector('.cart-list-all-select-delete')
const orderBtn = document.querySelector('.no-user-order-btn');
const userOrderBtn = document.querySelector('.user-order-btn')

class CartSection {
    constructor() {
        this.selectCount = [];
    }

    addSectionEvent() {
        allSelectBtn.addEventListener('click', (e) => {
            const checkBoxList = document.querySelectorAll('.cart-section-item-select')

            checkBoxList.forEach((checkBox) => {
                checkBox.checked = e.target.checked;
                if (
                    e.target.checked &&
                    !this.selectCount.includes(checkBox.value)
                ) {
                    this.selectCount.push(checkBox.value);
                } else if (!e.target.checked) {
                    this.selectCount = [];
                }
            })
            this.sectionRender();
        })

        allDeleteBtn.addEventListener("click", (e) => {
            this.selectCount.forEach((count) => {
                IDB.deleteIDB(Number(count));
                location.reload();
            });
            this.selectCount = [];
            this.sectionRender();
        })

        orderBtn.addEventListener('click', (e) => {
            if (this.selectCount.length === 0) {
                e.preventDefault();
                alert('선택한 상품이 없습니다.')
            } 
            this.selectCount.map((num) => {
                IDB.updateIDB(Number(num), true)
            })
        })

        userOrderBtn.addEventListener('click', (e) => {
            if (this.selectCount.length === 0) {
                e.preventDefault();
                alert('선택한 상품이 없습니다.')
            } 
            this.selectCount.map((num) => {
                IDB.updateIDB(Number(num), true)
            })
        })
    }

    totalCountRender() {
        const totalCount = document.querySelector('.cart-section-select-item-count-text');
        const totalCountIco = document.querySelector('.cart-section-select-check-ico')
        if (this.selectCount.length > 0) {
            totalCount.innerHTML = `${this.selectCount.length}개를 선택하셨습니다.`
            totalCount.classList.remove('text-no');
            totalCountIco.classList.remove('ico-no');
        } else {
            totalCount.innerHTML = '선택한 상품이 없습니다.'
            totalCount.classList.add('text-no');
            totalCountIco.classList.add('ico-no');
        }
    }

    totalAmountRender() {
        const totalAmount = document.querySelector('.cart-section-select-item-total-amount');
        const selectAmount = document.querySelectorAll('.cart-section-item-price')
        let amount = 0;
        selectAmount.forEach((item) => {
            if (this.selectCount.includes(item.getAttribute('value'))) {
                console.log(item.innerText)
                amount += parseInt(item.innerText.replace(/,/g , ''))
           }
        })
        
        totalAmount.innerText = `${amount.toLocaleString()}원`
    }

    sectionRender() {
        this.totalCountRender()
        this.totalAmountRender()
    }
}

class Cart extends CartSection {
    constructor(target, selectCount) {
        super(selectCount);
        this.target = target;
        this.state;
    }

    async setState() {
        this.state = await IDB.getAllIDB();
    }

    async template() {
        await this.setState();
        const cartList = this.state;

        let template = "";
        cartList.map((item) => {
            //원화 단위로 변환
            const formattedPrice = item.price.toLocaleString() + "원";

            template += `
                <li class="cart-section-item">
                    <div class="cart-section-item-selcet-box">
                        <input
                            type="checkbox"
                            class="cart-section-item-select"
                            value=${item.id}
                        />
                    </div>
                    <img
                        src=${item.imgUrl}
                        alt=""
                        class="cart-section-item-img"
                    />
                    <div class="cart-section-item-introduce">
                        <div class="cart-section-item-title">
                            ${item.title}
                        </div>
                        <div class="cart-section-item-author">
                            ${item.author}
                        </div>
                        <div class="cart-section-item-btns">
                            <button
                                type="button"
                                class="cart-section-item-delete-btn"
                                value=${item.id}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                    <div class="cart-section-item-price-box">
                        <span class="cart-section-item-price"
                        value=${item.id}                        
                        >${formattedPrice}</span
                        >
                        <div class="cart-section-quantity-btn">
                            <button type="button" class="minus-btn"></button>
                            <input type="number" class="item-quantity" value="1">
                            <button type="button" class="plus-btn"></button>
                        </div>
                    </div>
                </li>
            `;
        });

        return template;
    }

    async addEvent() {
        this.target.addEventListener("click", (e) => {
            if (e.target.classList.contains("cart-section-item-select")) {
                if (this.selectCount.includes(e.target.value)) {
                    this.selectCount.splice(
                        this.selectCount.indexOf(e.target.value),
                        1
                    );
                } else {
                    this.selectCount.push(e.target.value);
                }
            }

            if (e.target.classList.contains("cart-section-item-delete-btn")) {
                IDB.deleteIDB(Number(e.target.value));
                location.reload();
            }
            this.sectionRender();

            if (e.target.classList.contains("minus-btn")) {
                const quantity = document.querySelector('.item-quantity')
                if (quantity.value == 1) {
                    e.target.setAttribute('disabled');
                } else {
                    e.target.removeAttribute('disabled');
                }
                quantity.value -= 1
            }

            if (e.target.classList.contains("plus-btn")) {
                const quantity = document.querySelector('.item-quantity')
                console.log(e.target)
                quantity.value = Number(quantity.value) + 1;
                console.log(quantity.value)
            }
        })
    }

    async render() {
        const template = await this.template();

        this.target.innerHTML = template;
        this.sectionRender();
        this.addSectionEvent();
        this.addEvent();
    }
}

const cart = new Cart(cartUl);
cart.render();
