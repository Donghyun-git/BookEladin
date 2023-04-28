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
        const uri = `http://www.eladin.store/orders/user/${userId}`;

        const myAllOrders = await axios.get(uri, header);

        return myAllOrders.data.data;
    } catch (err) {
        console.log(err);
    }
};
getMyAllOrders().then((myOrder) => {
    const orderListArea = document.querySelector(".main-orderlist section");
    console.log(myOrder);
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
                <button class="review-btn" data-order="${orderNumber}">
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
        const uri = "http://www.eladin.store/orders/user";

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

        console.log(cancelResponse);
        // window.alert("주문이 성공적으로 취소 되었습니다!");
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
    if (e.target.dataset.order) {
        orderNumber = e.target.dataset.order;
        cancelOrder();
    }
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
