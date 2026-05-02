const API_BASE = '/api/products'

export const getAllProducts = async () => {
    try {
        const res = await fetch(API_BASE);
        
        if (!res.ok) {
            throw new Error (`Server error: ${res.status}`);
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Failed to receive the products:`, error.message);
        return [];
    }
}