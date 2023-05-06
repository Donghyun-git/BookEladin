const orderListArea = document.querySelector(".main-orderlist section");
const userNameArea = document.querySelector(".user-name");
const guestOrder = JSON.parse(localStorage.getItem('guestOrder'));
const { foundOrders, imgUrlList, titleList, userName } = guestOrder.value;

userNameArea.innerText = `${userName} 님의 주문 내역 입니다.`
if(foundOrders) {
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
}
