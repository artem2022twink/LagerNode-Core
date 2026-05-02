document.addEventListener('DOMContentLoaded', () => {
    const ERR_PATH = '/error/error.html'
    const PRODUCTS_PATH = '/user/products.html'

    const navigateTo = (path, params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        window.location.href = `${path}${queryString ? '?' + queryString : ''}`;
    };

    const getAllProductsBtn = document.getElementById('btn-products-get-all');

    if (getAllProductsBtn) {
        getAllProductsBtn.addEventListener('click', () => {
            navigateTo(PRODUCTS_PATH);
        });
    } else {
        navigateTo(ERR_PATH, {status: 'Error', message: 'ERR_DOM_ELEMENT_NOT_FOUND'});
    };

    const getProductByIdBtn = document.getElementById('btn-products-get-by-id');
    const inputProductId = document.getElementById('input-product-id');

    if (getProductByIdBtn && inputProductId) {
        getProductByIdBtn.addEventListener('click', () => {
            
            const id = inputProductId.value.trim();

            if (id.length === 0) {
                navigateTo(ERR_PATH, {status: 'Error', message: 'ERR_INPUT_IS_REQUIRED'});
                return;
            }
            
            if (isNaN(id)) {
                navigateTo(ERR_PATH, {status: 'Error', message: 'ERR_INVALID_INPUT_VALUE'});
                return;
            }

            if (Number(id) <= 0) {
                navigateTo(ERR_PATH, {status: 'Error', message: 'ERR_ID_MUST_BE_POSITIVE'});
                return;
            }

            navigateTo(PRODUCTS_PATH, {id: id});
        });
    } else {
        navigateTo(ERR_PATH, {status: 'Error', message: 'ERR_DOM_ELEMENT_NOT_FOUND'});
    };

    const getProductByCategoryBtn = document.getElementById('btn-products-get-by-category');
    const selectCategoryRead = document.getElementById('select-category-read');

    if (getProductByCategoryBtn && selectCategoryRead) {
        getProductByCategoryBtn.addEventListener('click', () => {
            const selectedCategory = selectCategoryRead.value;

            if (selectedCategory === 'not-selected') {
                navigateTo(ERR_PATH, {status: 'Error', message: 'CATEGORY_IS_REQUIRE'});
                return;
            };
        
            navigateTo(PRODUCTS_PATH, {category: selectedCategory});
        });
    } else {
        navigateTo(ERR_PATH, {status: 'Error', message: 'ERR_DOM_ELEMENT_NOT_FOUND'});
    };

    const getLowStockProductsBtn = document.getElementById('btn-products-get-low-stock');
    const inputStockThreshold = document.getElementById('input-stock-threshold');

    if (getLowStockProductsBtn && inputStockThreshold) {
        getLowStockProductsBtn.addEventListener('click', () => {
            const threshold = inputStockThreshold.value;

            if (threshold.trim().length === 0) {
                navigateTo(ERR_PATH, {status: 'Error', message: 'ERR_INPUT_IS_REQUIRED'});
                return;
            };

            if (isNaN(threshold)) {
                navigateTo(ERR_PATH, {status: 'Error', message: 'ERR_INVALID_INPUT_VALUE'});
                return;
            };

            if (Number(threshold) <= 0) {
                navigateTo(ERR_PATH, {status: 'Error', message: 'ERR_THRESHOLD_MUST_BE_POSITIVE'});
                return;
            };

            navigateTo(PRODUCTS_PATH, {stock: threshold});
        });
    } else {
        navigateTo(ERR_PATH, {status: 'Error', message: 'ERR_DOM_ELEMENT_NOT_FOUND'});
    };

    const searchProductsByNameBtn = document.getElementById('btn-products-search');
    const inputSearchName = document.getElementById('input-search-name');

    if (searchProductsByNameBtn && inputSearchName) {
        searchProductsByNameBtn.addEventListener('click', () => {
            const name = inputSearchName.value.trim();

            if (name.length === 0) {
                navigateTo(ERR_PATH, {status: 'Error', message: 'ERR_INPUT_IS_REQUIRED'});
                return;
            };
        
            navigateTo(PRODUCTS_PATH, {name: name});
        });
    } else {
        navigateTo(ERR_PATH, {status: 'Error', message: 'ERR_DOM_ELEMENT_NOT_FOUND'});
    };


});