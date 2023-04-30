const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

const getSearchProducts = async (query) => {
    try {
        const uri = `https://www.eladin.store/books/search?q=${query}`;
        const header = {
            headers: {},
            withCredentials: true,
        };

        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            header.headers.Authorization = `Bearer ${accessToken}`;
        } else if (document.cookie.includes("uuid")) {
            const uuid = document.cookie.split("=")[1];
            header.headers.uuid = uuid;
        }

        const response = await axios.get(uri, header);
        localStorage.setItem("search", JSON.stringify(response.data.data));
        location.href = "./pages/search.html";
    } catch (err) {
        console.log(err);
        if (err.response.status === 400) {
            alert("검색어를 입력해주세요!");
        }
    }
};

searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    getSearchProducts(query);
});

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const query = searchInput.value;
        getSearchProducts(query);
    }
});
