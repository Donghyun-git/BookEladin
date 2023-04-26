const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

//쿠키에 refreshToken 저장
document.cookie = `refreshToken=${refreshToken}; path=/`;

const getCategoriesForUser = async () => {
    const header = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
    };

    const uri = 'http://localhost:5500/books/categories';
    const Category = await axios.get(uri, header);

    const { data } = Category.data;

    return data;
};

// const getCategoriesForGuestUser = async () => {
//     const Category = await axios.get(
//         "http://localhost:5500/books/categories"
//     );
//     const { data } = Category.data;

//     return data;
// };

const fetchCategoryList = async () => {
    // if (accessToken) {
    let categoryList = await getCategoriesForUser();
    // } else {
    //     categoryList = await getCategoriesForGuestUser();
    // }
    return categoryList;
};

// 카테고리 리스트 불러오기.

fetchCategoryList().then((categoryList) => {
    localStorage.setItem('categoryList', categoryList);
});
