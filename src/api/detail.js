const detailData = JSON.parse(localStorage.getItem('detail'));
// const { productId, author, title, imgUrl, price, introduction, publisher } = detailData;
const { productId } = detailData;

const getProductByProductId = async () => {
    const uri = `http://localhost:5500/books//products/${productId}`;
    const header = {
        headers: {},
        withCredentials: true,
    };
    if (localStorage.getItem('accessToken')) {
        header.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    } else if (document.cookie.includes('uuid')) {
        const uuid = document.cookie.split('=')[1];
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
    const mainBook = document.querySelector('.main-book');
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
                                                            <p>${res.publisher}</p>
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
                                            <a href="#"
                                                ><i
                                                    class="fa fa-heart"
                                                    aria-hidden="true"
                                                ></i
                                            ></a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                ><i
                                                    class="fa fa-shopping-cart"
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
    const introduction = document.querySelector('.main-review-intro p');
    introduction.innerHTML = res.introduction;
});
