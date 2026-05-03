const API_BASE = '/api/products'

export const getAllProducts = async () => {
    try {
        const res = await fetch(API_BASE);
        
        if (!res.ok) {
            throw new Error (JSON.stringify({status: res.status, message: 'DATABASE_ERROR'}));
        }
        
        const data = await res.json();
        return data;

    } catch (error) {
        const errorData = JSON.parse(error.message);
        return {success: false, errorData: errorData};
    };
};

export const getProductById = async (id) => {
    try {
        const res = await fetch(`${API_BASE}/${id}`);

        if (!res.ok) {
            const errorMsg = res.status === 404 ? 'PRODUCT_NOT_FOUND' : 'SERVER_ERROR';
            throw new Error(JSON.stringify({
                status: res.status,
                message: errorMsg
            }));
        }

        const data = await res.json();
        return data;

    } catch (error) {
        const errorData = JSON.parse(error.message);
        return {success: false, errorData: errorData};
    };
};