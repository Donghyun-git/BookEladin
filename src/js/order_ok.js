const deliveryHistory = document.querySelector('.order_ok-list');
const orderData = (JSON.parse(localStorage.getItem('order')));
const query =  orderData.createdOrder ? 
    orderData.createdOrder :
    orderData  

const getAxios = async (url, query) => {
    const header = {
        withCredentials: true,
    }
    const res = await axios.get(`${url}/${query}`, header);
    console.log(res);

    const orderNumber = res.data.data.foundOrder.orderInfo.orderNumber 
    const data = res.data.data.foundOrder.deliveryInfo

    data.orderNumber = orderNumber;
    return data
}

class OrderOk {

    constructor(target) {
        this.target = target;
        this.state;
    }

    async setState() {
        try {
            this.state = await getAxios(
                "http://localhost:5500/orders", 
                query.orderInfo.orderNumber
            )
        } catch(err) {
            console.log(err);
        }
    }

    async template() {
        await this.setState()
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

    async render() {
        let template = await this.template();

        this.target.innerHTML = template;
    }
}

const orderOk = new OrderOk(deliveryHistory)

orderOk.render();