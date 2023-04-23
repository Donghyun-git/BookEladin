//index.html 에서 쓰는 api script , getCategory.js에 access,refresh token 변수 존재
const getProductsForUser = async () => {

    const header = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
    };

    const Products = await axios.get("http://localhost:5501/products", header);

    const { data } = Products.data;

    return data;
};

const getProductsForGuestUser = async () => {
    const Products = await axios.get("http://localhost:5501/products");
    const { data } = Products.data;

    return data;
};

const fetchProducts = async () => {
    let productsList;
    if (accessToken) {
        productsList = await getProductsForUser();
    } else {
        productsList = await getProductsForGuestUser();
    }
    return productsList;
};

// 전체 상품 불러오기.

fetchProducts().then((productsList) => {
    localStorage.setItem("productsList", JSON.stringify(productsList));
});
