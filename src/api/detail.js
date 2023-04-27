import IDB from "../js/indexedDB.js";

const detailData = JSON.parse(localStorage.getItem("detail"));
// const { productId, author, title, imgUrl, price, introduction, publisher } = detailData;

const { productId } = detailData;

const getProductByProductId = async () => {
    const uri = `http://localhost:5500/books//products/${productId}`;
    const header = {
        headers: {},
        withCredentials: true,
    };
    if (localStorage.getItem("accessToken")) {
        header.headers.Authorization = `Bearer ${localStorage.getItem(
            "accessToken"
        )}`;
    } else if (document.cookie.includes("uuid")) {
        const uuid = document.cookie.split("=")[1];
        header.headers.uuid = uuid;
    }
    try {
        const detailResponse = await axios.get(uri, header);
        const { data } = detailResponse.data;

        return data;
    } catch (err) {
        console.log(err);
    }
};
getProductByProductId().then((res) => {
    console.log(res);
    const mainBook = document.querySelector(".main-book");
    mainBook.innerHTML = `
        <div class="main-book-img">
                                <img
                                    src="${res.imgUrl}"
                                    alt="책 상세이미지"
                                />
                            </div>

                            <div>
                                <div class="main-book-info">
                                    <ul>
                                        <li>
                                            <span>${res.category}</span>
                                        </li>
                                        <li>
                                            <h2 class="book-info-tit">
                                                ${res.title}
                                            </h2>
                                        </li>
                                        <li>
                                            <div class="book-info-cont">
                                                <span
                                                    >⭐︎⭐︎⭐︎⭐︎⭐︎ 4.2점
                                                     (227명)</span
                                                >

                                                <div class="author">
                                                    <h4 style="display: inline-block">저자</h4>
                                                    <a
                                                        >${res.author}</a
                                                    >
                                                </div>

                                                <div class="publisher">
                                                    <ul>
                                                        <li>출판사</li>
                                                        <li>
                                                            <p>${
                                                                res.publisher
                                                            }</p>
                                                        </li>
                                                    </ul>
                                                    <ul class="product-id">
                                                        <li>상품번호</li>
                                                        <li>${res._id}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="price">
                                    <ul>
                                        <li>판매가</li>
                                        <li class="price-won">${res.price.toLocaleString()} 원</li>
                                    </ul>
                                </div>

                                <div class="main-user-buy">
                                    <ul>

                                        <li>
                                            <a href="#" style="font-size: 24px;"
                                                ><i
                                                    class="fa fa-shopping-cart add-cart"
                                                    aria-hidden="true"
                                                ></i
                                            ></a>
                                        </li>
                                        <li class="buy-button">
                                            <a href="#">바로구매</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
    `;
    const introduction = document.querySelector(".main-review-intro p");
    introduction.innerHTML = res.introduction;

    const addCartBtn = document.querySelector(".add-cart");
    const buyBtn = document.querySelector(".buy-button");

    //장바구니담기, 주문하기
    const { title, author, price, imgUrl, productId } = res;
    console.log(title, author, price, imgUrl, productId);

    addCartBtn.addEventListener("click", () => {
        addIdxDB(title, author, price, imgUrl, productId, false);
        openAlert();
    });

    buyBtn.addEventListener("click", () => {
        addIdxDB(title, author, price, imgUrl, productId, true);
        if (localStorage.getItem("userData")) {
            location.href = "order.html";
        } else {
            location.href = "guest_login.html";
        }
    });

    function addIdxDB(title, author, price, imgUrl, productId, order) {
        const book = [
            {
                title: title,
                author: author,
                price: price,
                imgUrl: imgUrl,
                productId: productId,
                order: !!order,
                quantity: 1,
            },
        ];
        IDB.addIDB(book);
    }

    const cartAlert = document.querySelector(".cart-alert");
    const closeButton = document.querySelector(".close-alert");
    const cancelButton = document.querySelector(".cancel-button");
    const confirmButton = document.querySelector(".confirm-button");

    closeButton.addEventListener("click", closeAlert);
    cancelButton.addEventListener("click", closeAlert);
    confirmButton.addEventListener("click", () => {
        location.href = "cart.html";
    });

    function closeAlert() {
        cartAlert.style.display = "none";
    }

    function openAlert() {
        cartAlert.style.display = "flex";
        setTimeout(() => {
            cartAlert.style.display = "none";
        }, 3000);
    }
});

// 장바구니 alert

// const closeButton = document.querySelector(".close-alert");
// const cancelButton = document.querySelector(".cancel-button");
// const confirmButton = document.querySelector(".confirm-button");

// closeButton.addEventListener("click", closeAlert);
// cancelButton.addEventListener("click", closeAlert);
// confirmButton.addEventListener("click", () => {
//     location.href = "cart.html";
// });

// function closeAlert() {
//     cartAlert.style.display = "none";
// }

// function openAlert() {
//     cartAlert.style.display = "flex";
//     setTimeout(() => {
//         cartAlert.style.display = "none";
//     }, 3000);
// }
