import IDB from "./indexedDB.js";
import API from "../api/rest.js";

const nav = document.querySelector(".nav-side-category-bar");
const ul = document.querySelector(".category-book-list");
const title = document.querySelector(".category-book-title");

let query = "경영/경제";

class Category {
    target;
    state;

    constructor(target) {
        this.target = target;
        this.state;
    }

    async setState() {
        this.state = await API.get("http://localhost:5500/products/categories");
    }

    async template() {
        await this.setState();
        const categoryList = this.state;
        let template = "";
        await categoryList.data.map((category) => {
            template += `
                <div class="nav-side-category-link">
                    ${category}
                </div>
            `;
        });

        return template;
    }

    async addEvent() {
        this.target.addEventListener("click", (e) => {
            if (e.target.classList.contains("nav-side-category-link")) {
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
    target;
    state;

    constructor(target) {
        this.target = target;
        this.state;
    }

    async setState() {
        let encodedQuery = encodeURIComponent(query);
        const uri = "http://localhost:5500/products/categories";
        const accessToken = localStorage.getItem("accessToken");
        const header = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCrenditials: true,
        };
        this.state = await axios.get(`${uri}/${encodedQuery}`, header);
        console.log(this.state);
    }

    async template() {
        await this.setState();
        const bookList = this.state;

        let template = "";

        await bookList.data.data.map((book, i) => {
            template += `
                <li class="category-book-item">
                    <div class="category-book-item-img-area">
                        <div class="category-book-img-link">
                            <a href="./detail.html">
                                <img
                                src=${book.imgUrl}
                                alt=""
                                class="category-book-img"
                            />
                            </a>
                        </div>
                    </div>
                    <div class="category-book-item-introduce">
                        <h3 class="category-book-item-title-head">
                            <a
                                href="./detail.html"
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
                            <span>${book.price}원</span>
                        </p>
                    </div>
                    <div class="book-btn">
                        <button class="add-cart" data-index="${i}">
                            카트에 담기
                        </button>
                        <button class="order-book">
                            바로 구매
                        </button>
                    </div>
                </li>
             `;
        });
        return template;
    }

    async addEvent() {
        this.target.addEventListener("click", (e) => {
            console.log(e.target);
            console.log(this.state);
            if (e.target.classList.contains("add-cart")) {
                const { title, author, price, imgUrl } =
                    this.state.data[e.target.dataset.index];
                this.addIdxDB(title, author, price, imgUrl);
            }
        });
    }

    async render() {
        const template = await this.template();

        this.target.innerHTML = template;
    }

    async addIdxDB(title, author, price, imgUrl) {
        const book = [
            { title: title, author: author, price: price, imgUrl: imgUrl },
        ];
        IDB.addIDB(book);
    }
}

const category = new Category(nav);
category.render();

const book = new Book(ul);
book.render();
book.addEvent();
