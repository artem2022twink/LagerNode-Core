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

    
});