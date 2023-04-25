//index.html 에서 쓰는 api script , getCategory.js에 access,refresh token 변수 존재
const getProductsForUser = async () => {
    const header = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
    };

    const Products = await axios.get(
        'http://34.64.105.163:80/books/products',
        header
    );

    const { data } = Products.data;

    return data;
};

// [사용자] 상품 목록 - 전체 책 조회 (로그인 안한 사용자나 비회원)
// const getProductsForGuestUser = async () => {

//     const Products = await axios.get("http://34.64.105.163:80/books/products");
//     const { data } = Products.data;

//     return data;
// };

const fetchProducts = async () => {
    // let productsList;
    // if (accessToken) {
    let productsList = await getProductsForUser();
    // } else {
    //     productsList = await getProductsForGuestUser();
    // }
    return productsList;
};

// 전체 상품 불러오기.

// fetchProducts().then((productsList) => {
//     localStorage.setItem('productsList', JSON.stringify(productsList));
// });

export { fetchProducts };
