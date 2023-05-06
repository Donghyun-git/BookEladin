/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/getProducts.js":
/*!********************************!*\
  !*** ./src/api/getProducts.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchProducts\": () => (/* binding */ fetchProducts)\n/* harmony export */ });\n//index.html 에서 쓰는 api script , getCategory.js에 access,refresh token 변수 존재\nconst getProductsForUser = async () => {\n    if (localStorage.getItem('accessToken')) {\n        // 회원이 로그인한 상태\n        const header = {\n            headers: {\n                Authorization: `Bearer ${accessToken}`,\n            },\n            withCredentials: true,\n        };\n\n        const Products = await axios.get(\n            'https://www.eladin.store/books/products',\n            header\n        );\n\n        const { data } = Products.data;\n\n        return data;\n    } else if (localStorage.getItem('uuid')) {\n        const uuid = localStorage.getItem('uuid');\n        // 비회원 로그인한 상태\n        const header = {\n            headers: {\n                uuid: `${uuid}`, //나중에;\n            },\n            withCredentials: true,\n        };\n\n        const Products = await axios.get(\n            'https://www.eladin.store/books/products',\n            header\n        );\n\n        const { data } = Products.data;\n        return data;\n    } else {\n        const Products = await axios.get(\n            'https://www.eladin.store/books/products'\n        );\n\n        const { data } = Products.data;\n        return data;\n    }\n};\n\nconst fetchProducts = async () => {\n    let productsList = await getProductsForUser();\n    return productsList;\n};\n\n\n\n\n//# sourceURL=webpack://eladin-front/./src/api/getProducts.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_getProducts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/getProducts.js */ \"./src/api/getProducts.js\");\nconst bestSellerArea = document.querySelector(\".best-products\");\nconst newArea = document.querySelector(\".new-products\");\nconst recommendArea = document.querySelector(\".recommend-products\");\n\n\n//모달\nconst modal = document.querySelector(\".modal\");\nconst modalContent = document.querySelector(\".modal-text\");\nconst closeModalBtn = document.querySelector(\".close-modal-btn\");\n\nconst productsList = await (0,_api_getProducts_js__WEBPACK_IMPORTED_MODULE_0__.fetchProducts)();\n\n//초기값을 \"\"으로 할당해주지 않으면 undefined로 초기화되어 출력됨!\nlet bestProductsHtml = \"\";\nlet RecommendProductsHtml = \"\";\nlet newProductsHtml = \"\";\n\n//slice로 상품 30개씩 가져옴\nlet bestproducts = productsList\n    .filter((product) => (product.bestSeller = true))\n    .slice(0, 30);\nlet newProducts = productsList\n    .filter((product) => (product.newBook = true))\n    .slice(10, 40);\nlet RecommendProducts = productsList\n    .filter((product) => (product.recommend = true))\n    .slice(20, 50);\n//html 상품 넣기\nfunction addProductList(productsType, typeArea) {\n    let newHtml = \"\";\n    productsType.forEach((products) => {\n        const { author, productId, introduction, price, title, imgUrl } =\n            products;\n\n        const formattedPrice = price.toLocaleString() + \"원\";\n\n        if (products) {\n            newHtml += `\n        <li class=\"products-list-info\">\n        <a href=\"./pages/detail.html\" class=\"book-detail-button\"><img class=\"product-cover\" src=\"${imgUrl}\" alt=\"example_cover\" data-id=\"${productId}\"/></a>\n            <p class= \"title\">${title}</p>\n            <p class=\"author\">${author}</p>\n            <p class =\"introduction\">${introduction}</p>\n            <p class=\"price\">${formattedPrice}</p>\n        </li>\n    `;\n        }\n    });\n    typeArea.innerHTML = newHtml;\n}\n\naddProductList(bestproducts, bestSellerArea);\naddProductList(newProducts, newArea);\naddProductList(RecommendProducts, recommendArea);\n\n//상품 슬라이더 시작\nlet currentIdx = [0, 0, 0];\n\nconst chevronRightBtn = document.querySelectorAll(\".fa-chevron-circle-right\");\nconst chevronLeftBtn = document.querySelectorAll(\".fa-chevron-circle-left\");\n\n//오른쪽 버튼 효과\n\nchevronRightBtn.forEach((button, idx) => {\n    button.addEventListener(\"click\", function () {\n        let slides = button.parentElement.querySelector(\".slides\");\n        //버튼 나타나고 사라지는 효과\n        if (currentIdx[idx] === 0) {\n            chevronLeftBtn[idx].style.opacity = 1;\n        } else if (currentIdx[idx] === 4) {\n            button.style.opacity = 0;\n        }\n        //슬라이딩 되는 부분\n        if (currentIdx[idx] < 5) {\n\n            slides.style.left = -(currentIdx[idx] + 1) * 950 + \"px\";\n            currentIdx[idx] += 1;\n        }\n    });\n});\n\n//왼쪽 버튼 효과\n\nchevronLeftBtn.forEach((button, idx) => {\n    button.addEventListener(\"click\", function () {\n        let slides = button.parentElement.querySelector(\".slides\");\n        //버튼 나타나고 사라지는 효과\n        if (currentIdx[idx] === 1) {\n            button.style.opacity = 0;\n        } else if (currentIdx[idx] === 5) {\n            chevronRightBtn[idx].style.opacity = 1;\n        }\n        //슬라이딩 되는 부분\n        if (currentIdx[idx] > 0) {\n            slides.style.left = -(currentIdx[idx] - 1) * 950 + \"px\";\n            currentIdx[idx] -= 1;\n        }\n    });\n});\n\n// 자동 스크롤 버튼\nconst scrollToTopBtn = document.querySelector(\".scroll-to-top\");\n\n// 버튼 클릭 시 스무스하게 스크롤\nfunction scrollToTop() {\n    window.scrollTo({\n        top: 0,\n        behavior: \"smooth\",\n    });\n}\n\n// 현재 스크롤 위치 파악하고 버튼 노출 조절\nfunction checkScroll() {\n    const scrollTop = document.documentElement.scrollTop;\n\n    if (scrollTop > 0) {\n        scrollToTopBtn.style.display = \"flex\";\n        scrollToTopBtn.style.opacity = 1;\n    } else {\n        scrollToTopBtn.style.opacity = 0;\n        setTimeout(() => {\n            scrollToTopBtn.style.display = \"none\";\n        }, 700);\n    }\n}\n\nscrollToTopBtn.addEventListener(\"click\", scrollToTop);\nwindow.addEventListener(\"scroll\", checkScroll);\n\n/* 포인터 스크롤 */\nconst bestSeller = document.querySelector(\".best-seller\");\nconst newBook = document.querySelector(\".new-book\");\nconst recommendBook = document.querySelector(\".recommend-book\");\n\nconst moveToBest = (e) => {\n    e.preventDefault();\n    const targetElement = document.getElementById(\"best-seller\");\n    targetElement.scrollIntoView({ behavior: \"smooth\" });\n};\n\nconst moveToRecommend = (e) => {\n    e.preventDefault();\n    const targetElement = document.getElementById(\"recommend-book\");\n    targetElement.scrollIntoView({ behavior: \"smooth\" });\n};\n\nconst moveToNew = (e) => {\n    e.preventDefault();\n    const targetElement = document.getElementById(\"new-book\");\n    targetElement.scrollIntoView({ behavior: \"smooth\" });\n};\n\nbestSeller.addEventListener(\"click\", moveToBest);\nrecommendBook.addEventListener(\"click\", moveToRecommend);\nnewBook.addEventListener(\"click\", moveToNew);\n\n/* admin, user 필터링 */\n\nconst filterRole = (e) => {\n    if (localStorage.getItem(\"userData\")){\n        const { role } = JSON.parse(localStorage.getItem(\"userData\"));\n        if (role === \"admin\") {\n            e.preventDefault();\n            window.location.href = \"./pages/manage_category.html\";\n        } else {\n            modalContent.innerHTML = \"접근 권한이 없습니다!\";\n            openModal();\n        }\n    }\n};\n\nconst adminPageButton = document.querySelector(\".adminpage-button\");\nadminPageButton.addEventListener(\"click\", filterRole);\n\n/* 베스트셀러, 추천도서, 신간도서 상세페이지 */\n\nconst moveToDetailPage = (e) => {\n    if (e.target.dataset.id) {\n        const productId = {\n            productId: e.target.dataset.id,\n        };\n        localStorage.setItem(\"detail\", JSON.stringify(productId));\n    }\n};\n\nbestSellerArea.addEventListener(\"click\", moveToDetailPage);\nnewArea.addEventListener(\"click\", moveToDetailPage);\nrecommendArea.addEventListener(\"click\", moveToDetailPage);\n\n// 엘라딘의 선택 상세페이지\nconst EladinPicKImg = document.querySelector(\".introduction-content img\");\nconst EladinPicKTitle = document.querySelector(\".introduction-content .title\");\n\nconst moveToEladinPickDetailPage = () => {\n    localStorage.setItem(\"detail\", JSON.stringify({ productId: 41 }));\n};\n\nEladinPicKImg.addEventListener(\"click\", moveToEladinPickDetailPage);\nEladinPicKTitle.addEventListener(\"click\", moveToEladinPickDetailPage);\n\n// 모달\nfunction openModal() {\n    modal.classList.add(\"active\");\n    setTimeout(() => {\n        modal.classList.remove(\"active\");\n    }, 2000);\n}\ncloseModalBtn.addEventListener(\"click\", () => {\n    modal.classList.remove(\"active\");\n});\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://eladin-front/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;