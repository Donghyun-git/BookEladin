//모달
// const modal = document.querySelector(".modal");
// const modalContent = document.querySelector(".modal-text");
// const closeModalBtn = document.querySelector(".close-modal-btn");

/* 사용자 주문 내역 렌더링 */
const getMyAllOrders = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData.userId;

    try {
        const header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
        };
        const uri = `https://www.eladin.store/orders/user/${userId}`;

        const myAllOrders = await axios.get(uri, header);

        return myAllOrders.data.data;
    } catch (err) {
        console.log(err);
    }
};
getMyAllOrders().then((myOrder) => {
    const orderListArea = document.querySelector(".main-orderlist section");
    const { foundOrders, imgUrlList, titleList } = myOrder;
    const dateList = [];
    foundOrders.forEach((date) => {
        dateList.push(date.createdAt.split("T")[0]);
    });
    const setDateList = [...new Set(dateList)];

    setDateList.forEach((date) => {
        // 한번 돔 날짜 하나여서.
        const dateTag = document.createElement("p");
        const dateText = document.createTextNode(`${date}`);
        dateTag.classList.add(`${date}`);
        dateTag.classList.add("order-date");
        dateTag.appendChild(dateText);
        orderListArea.appendChild(dateTag);

        foundOrders.forEach((cont, idx) => {
            //두번돔 데이터 두개니까.
            let html = "";
            const { deliveryInfo, deliveryStatus, items, orderInfo } = cont;
            const { orderNumber } = orderInfo;
            const { address, addressDetail, receiverName, receiverPhone } =
                deliveryInfo;
            const orderDate = cont.createdAt.split("T")[0];
            if (orderDate == dateTag.classList.value.split(" ")[0]) {
                html += `
                <div class="order-content">
                <img
                    class="cover"
                    src="${imgUrlList[idx]}"
                    alt="책 이미지"
                />
                <div style="width: 30%; margin-left: 34px;">
                    <p class="orderNumber"><b>주문번호</b> - ${orderNumber}</p>
                    <p class="title">${titleList[idx]}</p>
                    <p class="price">${items[0].price.toLocaleString()} 원</p>
                </div>
                <div style="width:25%;">
                    <p class="address"><b>주소</b> <br> ${address} ${addressDetail}</p>
                    <p class="receiverName"><b>받는 사람</b> <br> ${receiverName}</p>
                    <p class="receiverPhone"><b>연락처</b> <br> ${receiverPhone}</p>
                </div>
                <div style="text-align:center; width: 10%;" class="delivery-status">${deliveryStatus}</div>
                <div style="text-align: right; width: 20%;">
                <button class="review-btn" onclick="location.href='./book_category.html'">
                    더 쇼핑 할래요
                </button>
                <button class="review-btn edit-order-modal" data-order="${orderNumber}">주문정보 수정</button>
                <button class="review-btn cancel-order-btn" data-order="${orderNumber}">
                    주문 취소
                </button>
                </div>
            </div>
            `;
            }
            dateTag.insertAdjacentHTML("afterend", html);
        });
    });
});

myPage.addEventListener("click", getUserInfo);

/* [사용자] 마이페이지 주문 취소 */

let orderNumber;

const cancelOrder = async () => {
    try {
        const uri = "https://www.eladin.store/orders/user";

        const header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
        };

        const cancelResponse = await axios.delete(uri, {
            headers: header.headers,
            data: { orderNumber: orderNumber },
            withCredentials: header.withCredentials,
        });

        modalContent.innerHTML = "주문이 성공적으로 취소 되었습니다!";
        openModal();
        setTimeout(() => {
            location.href = "./mypage.html";
        }, 2000);

        closeModalBtn.addEventListener("click", () => {
            location.href = "./mypage.html";
        });

        // window.location.href = "./mypage.html";
    } catch (err) {
        console.log(err);
    }
};

const orderListArea = document.querySelector(".main-orderlist section");
orderListArea.addEventListener("click", (e) => {
    if (
        e.target.dataset.order &&
        e.target.classList.contains(".cancel-order-btn")
    ) {
        orderNumber = e.target.dataset.order;
        cancelOrder();
    }
});

//주문정보 수정
const editOrder = document.querySelector(".edit-order");
const closeEditOrderBtn = document.querySelector(".edit-order-btn .cancel");
const completeEditOrderBtn = document.querySelector(
    ".edit-order-btn .complete"
);
//주문정보 수정 모달 오픈
orderListArea.addEventListener("click", (e) => {
    if (
        e.target.dataset.order &&
        e.target.classList.contains("edit-order-modal")
    ) {
        orderNumber = e.target.dataset.order;
        openEditModal();
    }
});

const openEditModal = () => {
    editOrder.classList.add("on");
};

//주문정보 수정 모달 닫기
closeEditOrderBtn.addEventListener("click", () => {
    editOrder.classList.remove("on");
});

const completeEditOrder = async () => {
    const newReceiverName = document.querySelector("#recipient");
    const newPostCode = document.querySelector("#postcode");
    const newAddress = document.querySelector("#address1");
    const newAddressDetail = document.querySelector("#address2");
    const newReceiverPhone = document.querySelector("#phone-num");

    try {
        const uri = "https://www.eladin.store/orders/user";

        const header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
        };

        const body = {
            orderNumber: Number(orderNumber),
            deliveryInfo: {
                receiverName: newReceiverName.value.trim(),
                postCode: newPostCode.value.trim(),
                address: newAddress.value.trim(),
                addressDetail: newAddressDetail.value.trim(),
                receiverPhone: newReceiverPhone.value.trim(),
            },
        };

        console.log("얍", uri, body, header);
        const updateResponse = await axios.patch(uri, body, header);
        const updateMessage = await updateResponse.data.message;

        modalContent.innerHTML = `${updateMessage}`;
        openModal();

        setTimeout(() => {
            location.href = "./mypage.html";
        }, 2000);
        closeModalBtn.addEventListener("click", () => {
            location.href = "./mypage.html";
        });
    } catch (err) {
        console.log(err);
        modalContent.innerHTML = `${err.response.data.message}`;
        openModal();
    }
};

//주문정보 수정 완료
completeEditOrderBtn.addEventListener("click", () => {
    completeEditOrder();
});

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
