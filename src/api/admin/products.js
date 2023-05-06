/* 모달 제어 */
/* 상품 등록 모달 */
const updateModal = document.querySelector('.update_modal');
const addButton = document.querySelector('.add-product-button');
const closeUpdateButton = document.querySelector('.update-modal-close');

const openUpdateModal = () => {
    updateModal.classList.add('on');
};

const closeUpdateModal = () => {
    updateModal.classList.remove('on');
};

addButton.addEventListener('click', openUpdateModal);
closeUpdateButton.addEventListener('click', closeUpdateModal);

/* 상품 수정 모달 */
const fixModal = document.querySelector('.fix_modal');
const fixButton = document.querySelectorAll('.item-fix-button');
const closeFixButton = document.querySelector('.fix-modal-close');

const openFixModal = () => {
    fixModal.classList.add('on') || updateModal.classList.remove('on');
};

const closeFixModal = () => {
    fixModal.classList.remove('on') || updateModal.classList.remove('on');
};

fixButton.forEach((button) => {
    button.addEventListener('click', openFixModal);
});

closeFixButton.addEventListener('click', closeFixModal);

/* 관리자 정보 */
const userData = JSON.parse(localStorage.getItem('userData'));
const adminName = document.querySelector('.user-name');
const email = document.querySelector('.email');

adminName.innerHTML = userData.userName;
email.innerHTML = userData.email;

/* [관리자] 카테고리 리스트 불러오기 */
const updateCategoryList = document.querySelector('.update-categorylist');
const fixCategoryList = document.querySelector('.fix-categorylist');

const getCategories = async () => {
    const uri = 'https://www.eladin.store/books/categories';
    const header = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: true,
    };

    const categories = await axios.get(uri, header);

    return categories.data.data;
};

getCategories().then((categories) => {
    let categorieyOptions = '';
    categories.forEach((category) => {
        categorieyOptions += `
        <option value="${category}">${category}</option>
        `;
    });
    updateCategoryList.innerHTML = categorieyOptions;
    fixCategoryList.innerHTML = categorieyOptions;
});

/* [관리자] 상품 추가한 리스트 불러오기 */
const productsArea = document.querySelector('.category.container .row.mt30');

const getProducts = async () => {
    const header = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: true,
    };

    const Products = await axios.get(
        'https://www.eladin.store/books/products',
        header
    );

    const { data } = Products.data;

    return data;
};
getProducts().then((res) => {
    let adminBookList = '';
    const filtered = res.filter((book) => book.productId > 300);
    filtered.forEach((book) => {
        adminBookList += `
        
            <li class="admin-book-item">
    <div class="admin-book-item-img-area">
        <a href="" class="admin-book-img-link">
        <img width="133px" height="150px"
        src=${book.imgUrl}
        alt="책 이미지"
        class="admin-book-img"
        />
        </a>
    </div>
    <div class="admin-book-item-introduce">
        <h3 class="admin-book-item-title-head">
            <a href="" class="admin-book-item-title">
                ${book.title}
            </a>
        </h3>
        <div class="admin-book-item-about">
            <div class="admin-book-item-output">
                <div class="admin-book-item-author">${book.author}</div>
                <div class="admin-book-item-publisher">${book.publisher}</div>
            </div>
            <p class="admin-book-item-describe">
                ${book.introduction}
            </p>
            <p class="admin-book-item-price">
                가격
                <span>${book.price.toLocaleString()}원</span>
            </p>
        </div>
    </div>
    <div class="admin-button">
        <div class="admin-button-area">
            <button class="admin-fix-button" data-uid=${
                book.productId
            }>수정</button>
            <button class="admin-delete-button" data-did="${
                book.productId
            }">삭제</button>
        </div>
    </div>
</li>
        `;
    });
    productsArea.innerHTML = adminBookList;
});

/* [관리자] 상품 추가 */

const createProducts = async () => {
    try {
        // const imgUrl = document.querySelector(".imgUrl");
        const updateTitle = document.querySelector('.update-title');
        const updateAuthor = document.querySelector('.update-author');
        const updatePrice = document.querySelector('.update-price');
        const updateCategory = document.querySelector('.update-categorylist');
        const updateImg = document.querySelector('.update-img');
        const updatePublisher = document.querySelector('.update-publisher');
        const updateInfo = document.querySelector('.update-intro');

        const formData = new FormData();
        formData.append('imageFile', updateImg.files[0]);

        const uri = 'https://www.eladin.store/books/products';
        const header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'multipart/form-data',
            },
            withCredentials: true,
        };
        const body = {
            title: updateTitle.value,
            author: updateAuthor.value,
            price: updatePrice.value,
            category: updateCategory.value,
            publisher: updatePublisher.value,
            introduction: updateInfo.value,
        };

        // formData.append("body", body); // formData에 바디정보 추가
        for (const key in body) {
            formData.append(key, body[key]);
        }

        const products = await axios.post(uri, formData, header);

        modalContent.innerHTML = '상품이 추가 되었습니다!';
        openModal();
        setTimeout(() => {
            closeUpdateModal();
            location.href = './manage_products.html';
        }, 2000);
        closeModalBtn.addEventListener('click', () => {
            closeUpdateModal();
            location.href = './manage_products.html';
        });
    } catch (err) {
        console.log(err);
    }
};

const addProductBtn = document.querySelector('.add-product-complete');
addProductBtn.addEventListener('click', createProducts);

/* [관리자] 책 정보 삭제 */
const deleteProducts = async (productId) => {
    const uri = `https://www.eladin.store/books/products/${productId}`;
    const header = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: true,
    };

    const products = await axios.delete(uri, {   
        headers: header.headers,
        withCredentials: header.withCredentials,
    });
    modalContent.innerHTML = '삭제되었습니다!';
    openModal();
    setTimeout(() => {
        location.href = './manage_products.html';
    }, 2000);
    closeModalBtn.addEventListener('click', () => {
        location.href = './manage_products.html';
    });
};

productsArea.addEventListener('click', (e) => {
    if (e.target.dataset.did) {
        const productId = e.target.dataset.did;
        deleteProducts(productId);
    }
});

/* [관리자] 책 정보 수정 */
let productId;
const fixProducts = async () => {
    try {
        const fixTitle = document.querySelector('.fix-title');
        const fixAuthor = document.querySelector('.fix-author');
        const fixPrice = document.querySelector('.fix-price');
        const fixCategory = document.querySelector('.fix-categorylist');
        const fixImg = document.querySelector('.fix-img');
        const fixPublisher = document.querySelector('.fix-publisher');
        const fixInfo = document.querySelector('.fix-intro');

        const uri = `https://www.eladin.store/books/products/${productId}`;
        const header = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            withCredentials: true,
        };
        const body = {
            title: fixTitle.value,
            author: fixAuthor.value,
            price: fixPrice.value,
            category: fixCategory.value,
            imgUrl: fixImg.value,
            publisher: fixPublisher.value,
            introduction: fixInfo.value,
        };

        const products = await axios.patch(uri, body, header);

        modalContent.innerHTML = '수정되었습니다!';
        openModal();
        setTimeout(() => {
            location.href = './manage_products.html';
        }, 2000);
        closeModalBtn.addEventListener('click', () => {
            location.href = './manage_products.html';
        });
    } catch (err) {
        console.log(err);
    }
};

const fixProductBtn = document.querySelector('.fix-product-complete');
fixProductBtn.addEventListener('click', fixProducts);

productsArea.addEventListener('click', (e) => {
    if (e.target.classList.contains('admin-fix-button')) {
        productId = e.target.dataset.uid;
        openFixModal();
    }
});

// 모달
function openModal() {
    modal.classList.add('active');
    setTimeout(() => {
        modal.classList.remove('active');
    }, 2000);
}
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});
