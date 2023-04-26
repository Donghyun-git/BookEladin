//index.html 에서 쓰는 api script , getCategory.js에 access,refresh token 변수 존재
const getProductsForUser = async () => {
    if (localStorage.getItem('accessToken')) {
        // 회원이 로그인한 상태
        const header = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        };

        const Products = await axios.get(
            'http://localhost:5500/books/products',
            header
        );

        const { data } = Products.data;

        return data;
    } else if (localStorage.getItem('uuid')) {
        // 비회원 로그인한 상태
        const header = {
            headers: {
                uuid: `${uuid}`, //나중에;
            },
            withCredentials: true,
        };

        const Products = await axios.get(
            'http://localhost:5500/books/products',
            header
        );

        const { data } = Products.data;
        console.log(data);
        return data;

        // else {
        // window.alert('로그인 후 이용해주세요!');
        // window.location.href = './pages/login.html'
    } else {
        const Products = await axios.get(
            'http://localhost:5500/books/products'
        );

        const { data } = Products.data;
        console.log(data);
        return data;
    }
};

// [사용자] 상품 목록 - 전체 책 조회 (로그인 안한 사용자나 비회원)
// const getProductsForGuestUser = async () => {

//     const Products = await axios.get("http://localhost:5500/books/products");
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
