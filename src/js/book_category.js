import IDB from './indexedDB.js';
import API from '../api/rest.js';

const nav = document.querySelector('.nav-side-category-bar');
const ul = document.querySelector('.category-book-list');
const title = document.querySelector('.category-book-title');

let query = '소설';

class Category {
    target
    state

    constructor(target) {
        this.target = target;
        this.state;
    }

    async setState() {
        this.state = await API.get('http://localhost:3000/category');
    }

    async template() {
        await this.setState();
        const categoryList = this.state;
        
        let template = '';
        await categoryList.map((category) => {
            template += `
                <div class="nav-side-category-link">
                    ${category.category}
                </div>
            `
        });

        return template;
    }

    async addEvent() {
        this.target.addEventListener('click', (e) => {
            if(e.target.classList.contains('nav-side-category-link')) {
                title.innerText = e.target.innerText;
                query = e.target.innerText;
                book.render();
            };
        });
    };

    async render() {
        const template = await this.template();
        
        this.target.innerHTML = template;
        this.addEvent();
    };
};

class Book {
    target
    state

    constructor(target) {
        this.target = target;
        this.state;
    }

    async setState() {
        this.state = await API.getQuery('http://localhost:3000/documents', query);
    }

    async template() {
        await this.setState();
        const bookList = this.state;
        
        let template = '';
        await bookList.map((book, i) => {
            template += `
                <li class="category-book-item">
                    <div class="category-book-item-img-area">
                        <div class="category-book-img-link">
                            <img
                                src=${book.url}
                                alt=""
                                class="category-book-img"
                                value=${i}
                            />
                        </div>
                    </div>
                    <div class="category-book-item-introduce">
                        <h3 class="category-book-item-title-head">
                            <a
                                href=""
                                class="category-book-item-title"
                                >${book.title}</a
                            >
                        </h3>
                        <div class="category-book-item-output">
                            <div class="category-book-item-author">
                                ${book.authors}
                            </div>
                            <div
                                class="category-book-item-publisher"
                            >
                                ${book.publisher}
                            </div>
                        </div>
                    <p class="category-book-item-describe">
                        ${book.contents}
                        </p>
                        <p class="category-book-item-price">
                            구매
                            <span>${book.price}원</span>
                        </p>
                    </div>
                </li>
             `
        })
        return template;
    }

    async addEvent() {
        this.target.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-book-img')) {
                const { title, authors, price, url } = this.state[e.target.getAttribute('value')];
                
                this.addIdxDB(title, authors, price, url);
            }
        })
    }

    async render() {
        const template = await this.template();

        this.target.innerHTML = template;
    };

    async addIdxDB(title, authors, price, url) {
        const book = [{ title: title, authors: authors, price: price, url: url }];
        IDB.addIDB(book);
    };
};

const category = new Category(nav);
category.render();

const book = new Book(ul);
book.render();
book.addEvent();



