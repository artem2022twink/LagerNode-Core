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