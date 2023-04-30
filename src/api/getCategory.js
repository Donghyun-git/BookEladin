const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');


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

    const uri = 'https://www.eladin.store/books/categories';
    const Category = await axios.get(uri, header);
    const { data } = Category.data;
    return data;
};

const fetchCategoryList = async () => {
    const categoryList = await getCategoriesForUser();
    return categoryList;
};
