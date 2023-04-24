const productsArea = document.querySelector(".products-list");

const productsList = JSON.parse(localStorage.getItem("productsList"));
console.log(productsList);

//초기값을 ""으로 할당해주지 않으면 undefined로 초기화되어 출력됨!
let productsHtml = "";

//slice로 9개만 가져옴
productsList.slice(0, 9).forEach((products) => {
    const { author, category, introduction, price, productId, title, imgUrl } =
        products;

    shortIntro = introduction.slice(0, 30) + "...";
    if (products) {
        productsHtml += `
        <div class="products-list-info">
            <img class="product-cover" src="${imgUrl}" alt="example_cover"/>
            <p class= "title">${title}</p>
            <p class="author">${author}</p>
            <p class ="introduction">${shortIntro}</p>
            <p class="price">${price}</p>
        </div>
    `;
    }
});

productsArea.innerHTML = productsHtml;
