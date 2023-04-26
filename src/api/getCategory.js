const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

//쿠키에 refreshToken 저장
document.cookie = `refreshToken=${refreshToken}; path=/`;

const getCategoriesForUser = async () => {
    const header = {
        headers: {},
        withCredentials: true,
    };

    if (localStorage.getItem('accessToken')) {
        header.headers.Authorization = `Bearer ${accessToken}`;
    } else if (document.cookie.includes('uuid')) {
        const uuid = document.cookie.split('=')[1];
        header.headers.uuid = uuid;
    }

    const uri = 'http://localhost:5500/books/categories';
    const Category = await axios.get(uri, header);
    const { data } = Category.data;
    return data;
};

const fetchCategoryList = async () => {
    const categoryList = await getCategoriesForUser();
    return categoryList;
};

// 카테고리 리스트 불러오기.

fetchCategoryList().then((categoryList) => {
    localStorage.setItem('categoryList', categoryList);
});
