import IDB from './indexedDB.js';

const nav = document.querySelector('.nav-side-category-bar');
const ul = document.querySelector('.category-book-list');
const title = document.querySelector('.category-book-title');
const cartAlert = document.querySelector('.cart-alert');
const accessToken = localStorage.getItem('accessToken');

let query = '경영/경제';

class Category {
    constructor(target) {
        this.target = target;
        this.state;
    }

    async setState() {
        const uri = 'https://www.eladin.store/books/categories';
        const header = {
            headers: {},
            withCredentials: true,
        };

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            header.headers.Authorization = `Bearer ${accessToken}`;
        } else if (document.cookie.includes('uuid')) {
            const uuid = document.cookie.split('=')[1];
            header.headers.uuid = uuid;
        }

        this.state = await axios.get(uri, header);
    }

    async template() {
        await this.setState();
        const categoryList = this.state.data.data;
        let template = '';
        await categoryList.map((category) => {
            template += `
                <div class="nav-side-category-link">
                    ${category}
                </div>
            `;
        });

        return template;
    }

    async addEvent() {
        this.target.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            if (e.target.classList.contains('nav-side-category-link')) {
                title.innerText = e.target.innerText;
                query = title.textContent;
                book.render();
            }
        });
    }

    async render() {
        const template = await this.template();
        this.target.innerHTML = template;
        this.addEvent();
    }
}

class Book {
    constructor(target) {
        this.target = target;
        this.state;
        this.err;
    }

    // async setState() {
    //     let encodedQuery = encodeURIComponent(query);
    //     const uri = 'https://www.eladin.store/books/categories';
    // const accessToken = localStorage.getItem("accessToken");
    // const header = {
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //     },
    //     withCrenditials: true,
    // };
    // this.state = await axios.get(`${uri}/${encodedQuery}`, header);
    //     this.state = await axios.get(`${uri}/${encodedQuery}`);

    //     this.addEvent(this.state.data.data);
    // }

    async setState() {
        let encodedQuery = encodeURIComponent(query);
        const uri = 'https://www.eladin.store/books/categories';
        const accessToken = localStorage.getItem('accessToken');
        const header = {
            headers: {},
            withCredentials: true,
        };
        if (accessToken) {
            header.headers.Authorization = `Bearer ${accessToken}`;
        } else if (document.cookie.includes('uuid')) {
            const uuid = document.cookie.split('=')[1];
            header.headers.uuid = uuid;
        }
        try {
            const data = await axios.get(`${uri}/${encodedQuery}`, header);
            this.state = await data.data.data;
            this.err = '';
        } catch (err) {
            if (err.response.status === 400) {
                this.err = '카테고리에 책이 존재하지 않습니다!';
            }
        }
    }

    async template() {
        await this.setState();
        const bookList = this.state;
        const errorMessage = this.err;

        let template = '';
        if (errorMessage === '') {
            await bookList.map((book, i) => {
                //원화 단위로 변환
                const formattedPrice = book.price.toLocaleString() + '원';
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
                            <a href="./detail.html"
                                class="category-book-item-title"
                                data-id="${book.productId}"
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
                        <button class="add-cart" data-index="${i}">
                            카트에 담기
                        </button>
                        <button class="order-book" data-index="${i}">
                            바로 구매
                        </button>
                    </div>
                </li>
            `;
            });
        } else {
            template += `
            <li>
                <div class="no-items" style="margin-top: 100px; display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 106px;">
                    <div class="no-items-img">
                        <img src="../img/eladin_genie.png" alt="엘라딘 이미지" style="width: 30%;">
                    </div>
                    <div class="no-items-cont">
                        <p style="font-size: 24px; font-weight: 500;">카테고리에 등록된 책이 없어요.</p>
                    </div>
                </div>
            </li>
            `;
        }

        return template;
    }

    async addEvent() {
        this.target.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            if (e.target.classList.contains('add-cart')) {
                const { title, author, price, imgUrl, productId } =
                    this.state[e.target.dataset.index];
                this.addIdxDB(title, author, price, imgUrl, productId, false);
                openAlert();
            }

            if (
                e.target.classList.contains('category-book-img') ||
                e.target.classList.contains('category-book-item-title')
            ) {
                const foundData = this.state.find((v) => {
                    return v.productId == e.target.dataset.id;
                });
                const {
                    title,
                    author,
                    price,
                    imgUrl,
                    introduction,
                    publisher,
                    productId,
                } = foundData;

                const detailData = {
                    productId: productId,
                    title: title,
                    author: author,
                    price: price,
                    imgUrl: imgUrl,
                    introduction: introduction,
                    publisher: publisher,
                };
                localStorage.setItem('detail', JSON.stringify(detailData));
            }

            if (e.target.classList.contains('order-book')) {
                const { title, author, price, imgUrl, productId } =
                    this.state[e.target.dataset.index];

                this.addIdxDB(title, author, price, imgUrl, productId, true);
                if (localStorage.getItem('userData')) {
                    location.href = 'order.html';
                } else {
                    location.href = 'guest_login.html';
                }
            }
        });
    }

    async render() {
        let template = await this.template();
        this.target.innerHTML = template;
        this.addEvent();
    }

    async addIdxDB(title, author, price, imgUrl, productId, order) {
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
}

const category = new Category(nav);
category.render();

const book = new Book(ul);
book.render();
// book.addEvent();

// 장바구니 alert

const closeButton = document.querySelector('.close-alert');
const cancelButton = document.querySelector('.cancel-button');
const confirmButton = document.querySelector('.confirm-button');

closeButton.addEventListener('click', closeAlert);
cancelButton.addEventListener('click', closeAlert);
cartAlert.addEventListener('click', (e) => {
    if (e.target.closest('.cart-alert-container')) {
        return;
    }
    cartAlert.style.display = 'none';
});
confirmButton.addEventListener('click', () => {
    location.href = 'cart.html';
});

function closeAlert() {
    cartAlert.style.display = 'none';
}

function openAlert() {
    cartAlert.style.display = 'flex';
    setTimeout(() => {
        cartAlert.style.display = 'none';
    }, 3000);
}

// 자동 스크롤 버튼
const scrollToTopBtn = document.querySelector('.scroll-to-top');

// 버튼 클릭 시 스무스하게 스크롤
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

// 현재 스크롤 위치 파악하고 버튼 노출 조절
function checkScroll() {
    const scrollTop = document.documentElement.scrollTop;

    if (scrollTop > 0) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.opacity = 1;
    } else {
        scrollToTopBtn.style.opacity = 0;
        setTimeout(() => {
            scrollToTopBtn.style.display = 'none';
        }, 700);
    }
}

scrollToTopBtn.addEventListener('click', scrollToTop);
window.addEventListener('scroll', checkScroll);
