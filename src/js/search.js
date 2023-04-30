const searchList = document.querySelector(".category-book-list");
let template = "";

if (localStorage.getItem("search")) {
    if (JSON.parse(localStorage.getItem("search")).length === 0) {
        template += `
        <li>
            <div class="no-items" style="margin-top: 100px; display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 106px;">
                <div class="no-items-img">
                    <img src="../img/eladin_genie.png" alt="엘라딘 이미지" style="width: 30%;">
                </div>
                <div class="no-items-cont">
                    <p style="font-size: 24px; font-weight: 500;">검색 결과가 없어요.</p>
                </div>
            </div>
        </li>
        `;
        searchList.innerHTML = template;
    } else {
        const searchData = JSON.parse(localStorage.getItem("search"));
        searchData.forEach((book, idx) => {
            const formattedPrice = book.price.toLocaleString() + "원";
            template += `
                <li class="category-book-item">
                    <div class="category-book-item-img-area">
                        <div class="category-book-img-link">
                            <a href="./detail.html">
                                <img
                                src=${book.imgUrl}
                                alt="책 이미지"
                                class="category-book-img"
                                data-id="${book.productId}"
                            />
                            </a>
                        </div>
                    </div>
                    <div class="category-book-item-introduce">
                        <h3 class="category-book-item-title-head">
                            <a
                                class="category-book-item-title"
                                >${book.title}</a
                            >
                        </h3>
                        <div class="category-book-item-output">
                            <div class="category-book-item-author">
                                ${book.author}
                            </div>
                            <div
                                class="category-book-item-publisher"
                            >
                                ${book.publisher}
                            </div>
                        </div>
                        <p class="category-book-item-describe">
                            ${book.introduction}
                        </p>
                        <p class="category-book-item-price">
                            구매
                            <span>${formattedPrice}</span>
                        </p>
                    </div>
                    <div class="book-btn">
                        <button class="order-book" data-id="${book.productId}">
                            상세 보기
                        </button>
                    </div>
                </li>
            `;
            searchList.innerHTML = template;
        });
    }   
} 

searchList.addEventListener('click', (e)=> {
    if(e.target.dataset.id){
        const productId = e.target.dataset.id;
        localStorage.setItem('detail', JSON.stringify({ productId : productId }));
        location.href = "./detail.html";
    }
})


