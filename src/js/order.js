import API from "../api/rest.js";
import IDB from "./indexedDB.js";

const chevron = document.querySelectorAll(".fa-chevron-down");
const form = document.getElementById("form");
const esseatialInput = document.querySelectorAll(".essential");
const List = document.querySelector(".product-list");

chevron[0].addEventListener("click", () => {
    let box = chevron[0].parentElement.nextSibling.nextSibling;
    if (box.style.display == "none") {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
});
chevron[1].addEventListener("click", () => {
    let box = chevron[1].parentElement.nextSibling.nextSibling;
    if (box.style.display == "none") {
        box.style.display = "flex";
    } else {
        box.style.display = "none";
    }
});
chevron[2].addEventListener("click", () => {
    let box = chevron[2].parentElement.nextSibling.nextSibling;
    if (box.style.display == "none") {
        box.style.display = "grid";
    } else {
        box.style.display = "none";
    }
});

class OrderList {
    constructor(target) {
        this.target = target;
        this.order;
    }

    async setOrder() {
        this.order = await IDB.getOrderIDB();
        console.log(this.order);
    }

    async template() {
        await this.setOrder();
        const orderList = this.order;

        let template = "";
        orderList.map((order) => {
            template += `
                <section class="product-detail">
                    <img
                        class="cover"
                        src="${order.imgUrl}"
                        alt="example_cover"
                    />
                    <div class="book-detail">
                        <p class="title">${order.title}</p>
                        <p class="author">
                            ${order.author}
                        </p>
                    </div>
                    <p class="price">${order.price.toLocaleString()}원</p>
                </section>
            `;
        });
        return template;
    }

    async totalPrice() {
        let total = 0;
        const orderPrice = document.querySelector(".order-price");
        await this.order.map((o) => {
            total += Number(o.price);
        });

        orderPrice.innerText = total.toLocaleString() + "원";
    }

    async render() {
        const template = await this.template();

        this.target.innerHTML = template;
        this.totalPrice();
    }
}

class OrderForm {
    constructor(form) {
        this.form = form;
        this.state = [];
        this.orderCount = [];
    }

    setState() {
        this.state = [];
        esseatialInput.forEach((tag) => {
            this.state.push(tag.value);
        });
    }

    validate() {
        this.setState();
        const checkBtn = document.getElementById("check-btn");

        for (let idx = 0; idx < this.state.length - 1; idx++) {
            if (this.state[idx] === "") {
                alert("필수 입력 사항을 모두 작성해주세요.");

                throw new Error("필수 입력 사항을 모두 작성해주세요.");
            }
        }
        const regul = /^01\d{1}-\d{4}-\d{4}$/;
        if (!regul.test(this.state[4])) {
            alert("휴대전화는 010-0000-0000형식으로 입력해주세요.");
            throw new Error("휴대전화는 010-0000-0000 형식으로 입력해주세요.");
        } else if (checkBtn.checked === false) {
            alert("구매 동의 항목에 체크해주세요.");

            throw new Error("구매 동의 항목에 체크해주세요");
        }

        return true;
    }

    addEvent() {
        this.form.addEventListener("click", (e) => {
            if (e.target.classList.contains("purchase-btn")) {
                try {
                    this.validate();
                    this.postDeliveryInfo();
                } catch (err) {
                    return err;
                }
            }
        });
    }

    async orderIDB() {
        const data = await IDB.getOrderIDB();
        const items = [];
        for (let idx = 0; idx < data.length; idx++) {
            const item = {
                productId: data[idx].productId,
                quantity: data[idx].quantity,
                price: data[idx].price,
            };
            items.push(item);
            this.orderCount.push(data[idx].id);
        }

        return items;
    }

    async deleteIDB() {
        this.orderCount.map((count) => {
            IDB.deleteIDB(count);
        });
    }

    async postDeliveryInfo() {
        const items = await this.orderIDB();
        const userData = JSON.parse(localStorage.getItem("userData"));
        const uuid = localStorage.getItem("uuid");
        const accessToken = localStorage.getItem("accessToken");

        // console.log(userId);
        // console.log(items);

        const data = {
            userId: userData ? userData.userId : "",
            uuid: !userData ? uuid : "",
            items: items,
            deliveryInfo: {
                receiverName: this.state[0],
                postCode: this.state[1],
                address: this.state[2],
                addressDetail: this.state[3],
                receiverPhone: this.state[4],
                deliveryMessage: this.state[5],
            },
        };

        const header = accessToken
            ? {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
            : { withCredentials: true };

        const url = accessToken
            ? "http://localhost:5500/orders/user"
            : "http://localhost:5500/orders/nonmember";
        try {
            const response = await axios.post(url, data, header);

            localStorage.setItem("order", JSON.stringify(response.data.data));
            this.deleteIDB();
            location.href = "order_ok.html";
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        this.addEvent();
    }
}

const orderList = new OrderList(List);
orderList.render();

const orderForm = new OrderForm(form);
orderForm.render();

// for (let i = 0; i < prices.length; i++) {
//     const noComma = prices[i].innerHTML.replace(',', '');
//     totalPrice += Number(noComma);
// }

// let result = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
