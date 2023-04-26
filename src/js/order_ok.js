const deliveryHistory = document.querySelector('.order_ok-list')

console.log(deliveryHistory)
let { orderInfo, deliveryInfo } = (JSON.parse(localStorage.getItem('order')))
const concatObj = (obj1, obj2) => {
    const newObj = {};
    for (let key in obj1) {
        newObj[key] = obj1[key];
    }
    for (let key in obj2) {
        newObj[key] = obj2[key];
    }
    return newObj;
}


class OrderOk {

    constructor(target) {
        this.target = target;
        this.state;
    }

    setState() {
        this.state = concatObj(orderInfo, deliveryInfo)
        console.log(this.state);
    }

    template() {
        this.setState()

        const template = `
            <ul class="list-row-1">
                <li><a>주문번호</a></li>
                <li>${this.state.orderNumber}</li>
            </ul>
            <ul class="list-row-2">
                <li><a>배송지</a></li>
                <li>
                    <div class="row-2-cont">
                        <h4>${this.state.receiverName}</h4>
                        <p>${this.state.receiverPhone}</p>
                        <b
                            >${this.state.address} 
                            ${this.state.addressDetail}</b
                        >
                        <p>(${this.state.postCode})</p>
                    </div>
                </li>
            </ul>
            <ul class="list-row-3">
                <li><a>배송 방법</a></li>
                <li>택배</li>
            </ul>
            <ul class="list-row-4">
                <li><a>배송메모</a></li>
                <li>${this.state.deliveryMessage}</li>
            </ul>
        `
        return template;
    }

    render() {
        let template = this.template();

        this.target.innerHTML = template;
    }
}

const orderOk = new OrderOk(deliveryHistory)

orderOk.render();