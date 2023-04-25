import IDB from "./indexedDB.js";

const cartUl = document.querySelector(".cart-section-list");
const allSelectBtn = document.querySelector(".cart-list-all-select-btn");
const allDeleteBtn = document.querySelector(".cart-list-all-select-delete");

class CartSection {
    constructor() {
        this.selectCount = [];
    }

    async addSectionEvent() {
        allSelectBtn.addEventListener("click", (e) => {
            const checkBoxList = document.querySelectorAll(
                ".cart-section-item-select"
            );

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
            });
        });

        allDeleteBtn.addEventListener("click", (e) => {
            this.selectCount.forEach((count) => {
                IDB.deleteIDB(Number(count));
                location.reload();
            });
            this.selectCount = [];
        });
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
                        >${formattedPrice}</span
                        >
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
        });
    }

    async render() {
        const template = await this.template();

        this.target.innerHTML = template;
        cart.addSectionEvent();
        this.addEvent();
    }
}

const cart = new Cart(cartUl);
cart.render();
