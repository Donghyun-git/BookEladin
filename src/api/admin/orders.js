/* 관리자 정보 */
const userData = JSON.parse(localStorage.getItem("userData"));
const adminName = document.querySelector(".user-name");
const email = document.querySelector(".email");

// //window alert 대용 모달
// const modal = document.querySelector(".modal");
// const modalContent = document.querySelector(".modal-text");
// const closeModalBtn = document.querySelector(".close-modal-btn");

adminName.innerHTML = userData.userName;
email.innerHTML = userData.email;

/* 상품 수정 모달 */
const buttonArea = document.querySelector(".category.container .row.mt30");
const fixModal = document.querySelector(".order_modal");
const closeFixButton = document.querySelector(".fix-modal-close");

const openFixModal = (e) => {
    if (e.target.dataset.uid) {
        fixModal.classList.add("on");
        orderNumber = e.target.dataset.uid;
    } else if (e.target.dataset.did) {
        orderNumber = e.target.dataset.did;
        deleteOrder();
    }
};

const closeFixModal = () => {
    fixModal.classList.remove("on");
};

buttonArea.addEventListener("click", openFixModal);
closeFixButton.addEventListener("click", closeFixModal);

/* [관리자] 주문정보 리스트 불러오기 */
const getOrders = async () => {
    const uri = "http://www.eladin.store/orders/admin";
    const header = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
    };

    const orders = await axios.get(uri, header);

    return orders.data.data;
};

getOrders().then((orders) => {
    console.log(orders);
    const orderList = document.querySelector(".admin-order-data");
    const { foundAllOrders, titleList, userNameList } = orders;
    let orderHTML = "";

    let totalPrice = 0;
    foundAllOrders.forEach((order, idx) => {
        order.items.forEach((v) => (totalPrice += v.price));
        const orderDate = order.createdAt.split("T")[0];
        const {
            address,
            addressDetail,
            postCode,
            receiverName,
            receiverPhone,
            deliveryMessage,
        } = order.deliveryInfo;
        const { deliveryStatus } = order;
        const { orderNumber } = order.orderInfo;

        const presentOrder = titleList[idx][0];
        const orderCount = titleList[idx].length;
        const orderUser = userNameList[idx];

        orderHTML += `
                <li class="admin-book-item">
                    <div class="admin-order">
                        <p><b>주문번호</b>${orderNumber}</p>
                        <p><b>주문시간</b>${orderDate}</p>
                    </div>
                    <div class="admin-book-item-introduce">
                        <h3 class="admin-book-item-title-head">
                            <a class="admin-book-item-title">
                            ${presentOrder} 외 ${orderCount - 1} 권
                            </a>
                        </h3>
                        <div class="admin-book-item-about">
                            <p class="admin-book-item-describe">
                                주문자 정보 - ${orderUser}
                            </p>
                            <p class="admin-book-item-price">
                                합계
                                <span>${totalPrice}원</span>
                            </p>
                        </div>
                    </div>
                    <div class="admin-order-info">
                        <p class="address"><b>도로명 주소: </b>${address}</p>
                        <p class="addressDetail"><b>상세 주소: </b>${
                            addressDetail || "상세주소가 없어요"
                        }</p>
                        <p class="postCode"><b>우편 번호: </b>${postCode}</p>
                        <p class="receiverName"><b>수신자: </b>${receiverName}</p>
                        <p class="receiverPhone"><b>연락처: </b>${receiverPhone}</p>
                        <p class="deliveryMessage"><b>배송메세지: </b>${
                            deliveryMessage || "배송메시지 없어요."
                        }</p>
                    </div>
                    <div class="admin-order-button">
                        <div class="admin-button-area">
                            <button class="admin-fix-button" data-uid="${orderNumber}">수정</button>
                            <button class="admin-delete-button" data-did="${orderNumber}">삭제</button>
                            <p class="deliveryStatus">${deliveryStatus}</p>
                        </div>
                    </div>
                </li>
                `;

        totalPrice = 0;
    });

    orderList.innerHTML = orderHTML;
});

/* [관리자] 배송 상태 수정 */
let orderNumber;
const updateDeliveryStatus = async () => {
    try {
        const uri = "http://www.eladin.store/orders/admin";
        const deliveryStatus = document.querySelector(
            ".select-deliverystatus"
        ).value;
        const header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
        };
        const body = {
            orderNumber: orderNumber,
            deliveryStatus: deliveryStatus,
        };

        const response = await axios.patch(uri, body, header);
        console.log(response);
        // window.alert("배송 상태가 수정되었습니다!");
        // window.location.href = "./manage_orders.html";
        modalContent.innerHTML = "배송 상태가 수정되었습니다!";
        openModal();
        setTimeout(() => {
            location.href = "./manage_orders.html";
        }, 2000);
        closeModalBtn.addEventListener("click", () => {
            location.href = "./manage_orders.html";
        });
    } catch (err) {
        console.log(err);
    }
};

const changeDeliveryStatusButton = document.querySelector(
    ".fix-delivery-complete"
);
changeDeliveryStatusButton.addEventListener("click", updateDeliveryStatus);

/* [관리자] 주문 목록 삭제 */
const deleteOrder = async () => {
    console.log(orderNumber);
    try {
        const uri = "http://www.eladin.store/orders/admin";
        const header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
        };

        const response = await axios.delete(uri, {
            headers: header.headers,
            data: { orderNumber: orderNumber },
            withCredentials: header.withCredentials,
        });
        console.log(response);
        // window.alert("주문이 삭제 되었습니다!");
        // window.location.href = "./manage_orders.html";
        modalContent.innerHTML = "주문이 삭제 되었습니다!";
        openModal();
        setTimeout(() => {
            location.href = "./manage_orders.html";
        }, 2000);
        closeModalBtn.addEventListener("click", () => {
            location.href = "./manage_orders.html";
        });
    } catch (err) {
        console.log(err);
    }
};

// 모달
function openModal() {
    modal.classList.add("active");
    setTimeout(() => {
        modal.classList.remove("active");
    }, 2000);
}
closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});
