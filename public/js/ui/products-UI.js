import { getAllProducts, getProductById } from "../api/products.js";

const ERR_PATH = '/error/error.html'
const PRODUCTS_PATH = '/user/products.html'

const navigateTo = (path, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    window.location.href = `${path}${queryString ? '?' + queryString : ''}`;
};

document.addEventListener('DOMContentLoaded', async () => {
    
    const params = new URLSearchParams(window.location.search);

    const getAll = params.get('getAll');
    const id = params.get('id');
    const category = params.get('category');
    const stock = params.get('stock');
    const name = params.get('name');
    const min = params.get('min');
    const max = params.get('max');

    if (getAll) {
        try {
            const getAllProductsFetch = await getAllProducts();
            
            if (getAllProductsFetch.success === false) {
                const errorInfo = getAllProductsFetch.errorData;
                navigateTo(ERR_PATH, {
                    status: errorInfo.status || 500,
                    message: errorInfo.message || 'UNKNOWN_ERROR'
                });
                return;
            };

            console.log(getAllProductsFetch);

        } catch (error) {
            console.error('Critical UI Error:', error);
            navigateTo(ERR_PATH, {status: Critical, message: 'UNEXPECTED_UI_ERROR'});
        };
    };

    if (id) {
        try {
            const getProductByIdFetch = await getProductById(id)

            if (getProductByIdFetch.success === false) {
                const errorInfo = getProductByIdFetch.errorData;
                navigateTo(ERR_PATH, {
                    status: errorInfo.status || 500,
                    message: errorInfo.message || 'UNKNOWN_ERROR'
                });
                return;
            };

            console.log(getProductByIdFetch);

        } catch (error) {
            console.error('Critical UI Error:', error);
            navigateTo(ERR_PATH, {status: Critical, message: 'UNEXPECTED_UI_ERROR'});
        };
    };
});