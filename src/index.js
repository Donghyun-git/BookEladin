const productsArea = document.querySelector(".products-list");

const productsList = JSON.parse(localStorage.getItem("productsList"));
console.log(productsList);

let productsHtml;

productsList.forEach((products) => {
    const { author, category, introduction, price, productId, title } = products;
    if(products) {
        productsHtml += `
        <div class="products-list-info" style="width: 200px; height: 300px; border: 1px solid black; display: inline-block;">
            <p>${category}</p>
            <p>${productId}</p>
            <p>${title}</p>
            <p>${author}</p>
            <p>${introduction}</p>
            <p>${price}</p>
        </div>
    `;
    }
});

productsArea.innerHTML = productsHtml;
