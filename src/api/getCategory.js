const token = localStorage.getItem("accessToken");

const getCategoriesForUser = async () => {
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const Category = await axios.get(
        "http://localhost:5500/products/categoryList",
        header
    );

    const { data } = Category.data;

    return data;
};

const getCategoriesForGuestUser = async () => {
    const Category = await axios.get("/products/categoryList");
    const { data } = Category.data;

    return data;
};

const fetchCategoryList = async () => {
    let categoryList;
    if (token) {
        categoryList = await getCategoriesForUser();
    } else {
        categoryList = await getCategoriesForGuestUser();
    }
    return categoryList;
};

// 카테고리 리스트 불러오기.

fetchCategoryList().then((categoryList) => {
    localStorage.setItem("categoryList", categoryList);
});
