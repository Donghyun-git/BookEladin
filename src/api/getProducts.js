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
            'http://www.eladin.store/books/products',
            header
        );

        const { data } = Products.data;

        return data;
    } else if (localStorage.getItem('uuid')) {
        const uuid = localStorage.getItem('uuid');
        // 비회원 로그인한 상태
        const header = {
            headers: {
                uuid: `${uuid}`, //나중에;
            },
            withCredentials: true,
        };

        const Products = await axios.get(
            'http://www.eladin.store/books/products',
            header
        );

        const { data } = Products.data;
        console.log(data);
        return data;
    } else {
        const Products = await axios.get(
            'http://www.eladin.store/books/products'
        );

        const { data } = Products.data;
        console.log(data);
        return data;
    }
};

const fetchProducts = async () => {
    let productsList = await getProductsForUser();
    return productsList;
};

export { fetchProducts };
