const userData = JSON.parse(localStorage.getItem('userData'));
const adminName = document.querySelector(".user-name");
const email = document.querySelector('.email');

adminName.innerHTML = userData.userName;
email.innerHTML = userData.email;


const categoriesArea = document.querySelector(".category.container .row.mt30");

 /* [관리자] 카테고리 리스트 불러오기 */

const getCategories = async () => {
    const uri = "http://localhost:5500/books/categories";
    const header = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
    };

    const categories = await axios.get(uri, header);

    return categories.data.data;
}

getCategories().then(categories => {
    let categoriesHTML = "";
    categories.forEach(category => {
        categoriesHTML += `
        <div class="category-list">
            <div class="category-list-title">
                <h3>${category}</h3>
            </div>
            <div class="category-list-button">
                <button class="delete" data-name="${category}">삭제</button>
            </div>
        </div>
        `;
    });
    categoriesArea.innerHTML = categoriesHTML;
});

/* [관리자] 카테고리 리스트 추가 */
const addCategoryBtn = document.querySelector('.add-category-button');
const categoryInput = document.querySelector('.category-add input');

const createCategory = async (categoryValue) => {
    try{
        const uri = "http://localhost:5500/books/categories/category";
        const header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
        };
        const body = {
            category: categoryValue,
        };

        const categories = await axios.post(uri, body, header);
        console.log(categories);
        window.alert('카테고리가 추가되었습니다!');
        window.location.href = './manage_category.html';
    } catch (err){
        if(err.response.status === 400){
            window.alert('등록하실 카테고리명을 입력해주세요!');
        }
        console.log(err);
    }
};

const createCategoryValue = () => {
    createCategory(categoryInput.value);
}

addCategoryBtn.addEventListener("click", createCategoryValue);



/* [관리자] 카테고리 삭제 */
const deleteCategory = async (e) => {
    if(e.target.classList.contains('delete')){
        const categoryName = e.target.dataset.name.toString();  //삭제하려는 카테고리명 추출.
        
        try {
        const uri = "http://localhost:5500/books/categories/category";
        const header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
        };

        const categories = await axios.delete(uri, {
            headers: header.headers, 
            data: { category: categoryName }, 
            withCredentials: header.withCredentials,
        });

        console.log(categories);

        window.alert("카테고리가 삭제되었습니다!");
        window.location.href = "./manage_category.html";

    } catch (err) {
            console.log(err);
        }
    }
}

categoriesArea.addEventListener('click', deleteCategory);



/* [관리자] 카테고리 수정*/
const updateCategoryBtn = document.querySelector(".update-category-button");

const updateCategory = async (currentCategory, newCategory) => {
        try {
            const uri = "http://localhost:5500/books/categories/category";
            const header = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
                withCredentials: true,
            };
            const body = {
                currentCategory: currentCategory,
                updateCategory: newCategory,
            };
            const categories = await axios.patch(uri, body, header);
            console.log(categories);
            window.alert("카테고리가 수정되었습니다!");
            window.location.href = "./manage_category.html";
        } catch (err) {
            if(err.response.status === 400){
                window.alert('현재 카테고리명과 수정하실 카테고리명을 입력해주세요!');
            }
            console.log(err);
        }
};

const updateCategoryValue = () => {
    const currentCategoryName = document.querySelector('.current-category').value;
    const newCategoryName = document.querySelector(".new-category").value;
    updateCategory(currentCategoryName, newCategoryName);
};

updateCategoryBtn.addEventListener("click", updateCategoryValue);



