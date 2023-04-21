const prices = document.querySelectorAll(".price");
const orderPrice = document.querySelector(".order-price");
const chevron = document.querySelectorAll(".fa-chevron-down");
// const purchaseBtn = document.querySelector(".purchase-btn");
// const essentialInput = document.querySelectorAll(".essential");

let totalPrice = 0;

for (let i = 0; i < prices.length; i++) {
    const noComma = prices[i].innerHTML.replace(",", "");
    totalPrice += Number(noComma);
}

let result = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

orderPrice.innerHTML = result;

// chevron[0].addEventListener("click", () => {
//     let box = chevron[0].parentElement.nextSibling.nextSibling;
//     if (box.style.display == "none") {
//         box.style.display = "block";
//     } else {
//         box.style.display = "none";
//     }
// });
// chevron[1].addEventListener("click", () => {
//     let box = chevron[1].parentElement.nextSibling.nextSibling;
//     if (box.style.display == "none") {
//         box.style.display = "flex";
//     } else {
//         box.style.display = "none";
//     }
// });
// chevron[2].addEventListener("click", () => {
//     let box = chevron[2].parentElement.nextSibling.nextSibling;
//     if (box.style.display == "none") {
//         box.style.display = "grid";
//     } else {
//         box.style.display = "none";
//     }
// });
