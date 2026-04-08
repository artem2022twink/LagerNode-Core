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

module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory
};