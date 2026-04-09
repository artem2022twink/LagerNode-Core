const fs = require('fs').promises;
const { error } = require('console');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data', 'dataBase.json');

const getAllProducts = async (req, res) => {
    try {
        const rawData = await fs.readFile(DB_PATH, 'utf-8');
        const data = JSON.parse(rawData);
        res.json(data.products);
    } catch (error) {
        res.status(500).json({ error: "Database erorr" });
    }
};

const getProductById = async (req, res) => {
    try {
        const rawData = await fs.readFile(DB_PATH, 'utf-8');
        const data = JSON.parse(rawData);
        const product = data.products.find(p => p.id === parseInt(req.params.id));

        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ error: "Product not found" });
        };
    } catch (erorr) {
        res.status(500).json({ error: "Server error" });
    }
};

const getProductByCategory = async (req, res) => {
    try {
        const rawData = await fs.readFile(DB_PATH, 'utf-8');
        const data = JSON.parse(rawData);
        const categoryFromUrl = req.params.category;
        const filteredProducts = data.products.filter(p => p.category === categoryFromUrl.toLowerCase());

        if (filteredProducts.length > 0) {
            res.json(filteredProducts);
        } else {
            res.status(404).json({ error: "Category is empty" });
        }
    } catch (error) {
        res.status(500).json({ error: "Category find error" });
    }
};

const lowStock = async (req, res) => {
    try {
        const rawData = await fs.readFile(DB_PATH, 'utf-8');
        const data = JSON.parse(rawData);
        const filteredProducts = data.products.filter(p => p.stock <= parseInt(req.params.amount));

        if (filteredProducts.length > 0) {
            res.json(filteredProducts);
        } else {
            res.status(404).json({ error: "These products are not available" })
        }
    } catch (erorr) {
        res.status(500).json({ error: "Server error" });
    }
};

const searchProducts = async (req, res) => {
    try {
        const rawData = await fs.readFile(DB_PATH, 'utf-8');
        const data = JSON.parse(rawData);
        const searchedProducts = data.products.filter(p => p.name.toLowerCase().includes((req.params.name || '').toLowerCase()));

        if (searchedProducts.length > 0) {
            res.json(searchedProducts);
        } else {
            res.status(404).json({ error: "These products are not available" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

filterByPriceRange = async (req, res) => {
    try {
        
        const rawData = await fs.readFile(DB_PATH, 'utf-8');
        const data = JSON.parse(rawData);
        
        if (req.params.min === undefined || req.params.max === undefined) {
            res.status(400).json({ error: "Min and max price are required" });
        }
        
        const min = parseFloat(req.params.min);
        const max = parseFloat(req.params.max);
        
        if (isNaN(min) || isNaN(max)) {
            res.status(400).json({ error: "Invalid price format"});
        }

        const categoryFromUrl = req.params.category 
            ? req.params.category.toLowerCase() 
            : '';

        let filteredProducts = data.products.filter(p => p.price >= min && p.price <= max);

        if (categoryFromUrl !== '') {
            filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === categoryFromUrl);
        };

        if (filteredProducts.length > 0) {
            res.json(filteredProducts);
        } else {
            res.status(404).json({ error: "These products are not available" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory,
    lowStock,
    searchProducts,
    filterByPriceRange
};