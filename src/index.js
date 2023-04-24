const bestSellerArea = document.querySelector(".best-products");
const newArea = document.querySelector(".new-products");
const recommendArea = document.querySelector(".recommend-products");

const productsList = JSON.parse(localStorage.getItem("productsList"));
console.log(productsList);

//초기값을 ""으로 할당해주지 않으면 undefined로 초기화되어 출력됨!
let bestProductsHtml = "";
let RecommendProductsHtml = "";
let newProductsHtml = "";

//slice로 10개만 가져옴
let bestproducts = productsList
    .filter((product) => (product.bestSeller = true))
    .slice(0, 10);
let newProducts = productsList
    .filter((product) => (product.newBook = true))
    .slice(10, 20);
let RecommendProducts = productsList
    .filter((product) => (product.recommend = true))
    .slice(20, 30);

function addProductList(productsType, typeArea) {
    let newHtml = "";
    productsType.forEach((products) => {
        const {
            author,
            category,
            introduction,
            price,
            title,
            imgUrl,
            bestSeller,
            newBook,
            recommend,
        } = products;

        if (products) {
            // shortIntro = introduction.slice(0, 30) + "...";

            newHtml += `
        <li class="products-list-info">
            <img class="product-cover" src="${imgUrl}" alt="example_cover"/>
            <p class= "title">${title}</p>
            <p class="author">${author}</p>
            <p class ="introduction">${introduction}</p>
            <p class="price">${price}</p>
        </li>
    `;
        }
    });
    typeArea.innerHTML = newHtml;
}

// bestSellerArea.innerHTML = bestProductsHtml;

addProductList(bestproducts, bestSellerArea);
addProductList(newProducts, newArea);
addProductList(RecommendProducts, recommendArea);

let currentIdx = [0, 0, 0];

const chevronRightBtn = document.querySelectorAll(".fa-chevron-circle-right");
chevronRightBtn.forEach((button, idx) => {
    button.addEventListener("click", function () {
        let slides = button.parentElement.querySelector(".slides");

        if (currentIdx[idx] === 0) {
            console.log(currentIdx);
            slides.style.left = -950 + "px";
            currentIdx[idx] += 1;
        }
    });
});

const chevronLeftBtn = document.querySelectorAll(".fa-chevron-circle-left");
chevronLeftBtn.forEach((button, idx) => {
    button.addEventListener("click", function () {
        let slides = button.parentElement.querySelector(".slides");

        if (currentIdx[idx] === 1) {
            console.log(currentIdx);
            slides.style.left = 0;
            currentIdx[idx] -= 1;
        }
    });
});
