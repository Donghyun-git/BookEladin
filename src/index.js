const bestSellerArea = document.querySelector(".best-products");
const newArea = document.querySelector(".new-products");
const recommendArea = document.querySelector(".recommend-products");
import { fetchProducts } from "./api/getProducts.js";

const productsList = await fetchProducts();
console.log(productsList);

//초기값을 ""으로 할당해주지 않으면 undefined로 초기화되어 출력됨!
let bestProductsHtml = "";
let RecommendProductsHtml = "";
let newProductsHtml = "";

//slice로 상품 30개씩 가져옴
let bestproducts = productsList
    .filter((product) => (product.bestSeller = true))
    .slice(0, 30);
let newProducts = productsList
    .filter((product) => (product.newBook = true))
    .slice(10, 40);
let RecommendProducts = productsList
    .filter((product) => (product.recommend = true))
    .slice(20, 50);
//html 상품 넣기
function addProductList(productsType, typeArea) {
    let newHtml = "";
    productsType.forEach((products) => {
        const { author, introduction, price, title, imgUrl } = products;

        const formattedPrice = price.toLocaleString() + "원";

        if (products) {
            newHtml += `
        <li class="products-list-info">
            <img class="product-cover" src="${imgUrl}" alt="example_cover"/>
            <p class= "title">${title}</p>
            <p class="author">${author}</p>
            <p class ="introduction">${introduction}</p>
            <p class="price">${formattedPrice}</p>
        </li>
    `;
        }
    });
    typeArea.innerHTML = newHtml;
}

addProductList(bestproducts, bestSellerArea);
addProductList(newProducts, newArea);
addProductList(RecommendProducts, recommendArea);

//상품 슬라이더 시작
let currentIdx = [0, 0, 0];

const chevronRightBtn = document.querySelectorAll(".fa-chevron-circle-right");
const chevronLeftBtn = document.querySelectorAll(".fa-chevron-circle-left");

//오른쪽 버튼 효과

chevronRightBtn.forEach((button, idx) => {
    button.addEventListener("click", function () {
        let slides = button.parentElement.querySelector(".slides");
        //버튼 나타나고 사라지는 효과
        if (currentIdx[idx] === 0) {
            chevronLeftBtn[idx].style.opacity = 1;
        } else if (currentIdx[idx] === 4) {
            button.style.opacity = 0;
        }
        //슬라이딩 되는 부분
        if (currentIdx[idx] < 5) {
            console.log(currentIdx);
            slides.style.left = -(currentIdx[idx] + 1) * 950 + "px";
            currentIdx[idx] += 1;
        }
    });
});

//왼쪽 버튼 효과

chevronLeftBtn.forEach((button, idx) => {
    button.addEventListener("click", function () {
        let slides = button.parentElement.querySelector(".slides");
        //버튼 나타나고 사라지는 효과
        if (currentIdx[idx] === 1) {
            button.style.opacity = 0;
        } else if (currentIdx[idx] === 5) {
            chevronRightBtn[idx].style.opacity = 1;
        }
        //슬라이딩 되는 부분
        if (currentIdx[idx] > 0) {
            console.log(currentIdx);
            slides.style.left = -(currentIdx[idx] - 1) * 950 + "px";
            currentIdx[idx] -= 1;
        }
    });
});

/* 포인터 스크롤 */
const bestSeller = document.querySelector('.best-seller');
const newBook = document.querySelector(".new-book");
const recommendBook = document.querySelector(".recommend-book");


const moveToBest = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById("best-seller");
    targetElement.scrollIntoView({ behavior: "smooth" });
}

const moveToRecommend = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById("recommend-book");
    targetElement.scrollIntoView({ behavior: "smooth" });
};

const moveToNew = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById("new-book");
    targetElement.scrollIntoView({ behavior: "smooth" });
};

bestSeller.addEventListener('click', moveToBest);
recommendBook.addEventListener('click', moveToRecommend);
newBook.addEventListener('click', moveToNew);
