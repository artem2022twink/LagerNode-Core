const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data', 'dataBase.json');

const readDB = async () => {
    const rawData = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(rawData);
};

const writeDB = async (data) => {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

const getAllProducts = async (req, res) => {
    try {
        const data = await readDB();
        return res.json(data.products);
    } catch (error) {
        return res.status(500).json({ error: "Database error" });
    }
};

const getProductById = async (req, res) => {
    try {
        const data = await readDB();

        if (!req.params.id) {
            return res.status(400).json({ error: "Product id is required" });
        };

        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "Invalid product id" });
        };

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: "Invalid product id" })
        };
        
        const product = data.products.find(p => p.id === id);

        if (product) {
            return res.json(product)
        } else {
            return res.status(404).json({ error: "Product not found" });
        };
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getProductByCategory = async (req, res) => {
    try {
        const data = await readDB();
        
        if (!req.params.category) {
            return res.status(400).json({ error: "Category is required" });
        }
        
        const categoryFromUrl = req.params.category.toLowerCase()
        const filteredProducts = data.products.filter(p => p.category.toLowerCase() === categoryFromUrl);

        if (filteredProducts.length > 0) {
            return res.json(filteredProducts);
        } else {
            return res.status(404).json({ error: "No products found for this category" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

const lowStock = async (req, res) => {
    try {
        const data = await readDB();
        
        if (!req.params.amount) {
            return res.status(400).json({ error: "Amount is required" });
        };
        
        const amount = Number(req.params.amount);

        if (Number.isNaN(amount) || amount < 0) {
            return res.status(400).json({ error: "Invalid amount" });
        };

        const filteredProducts = data.products.filter(p => p.stock <= amount);

        if (filteredProducts.length > 0) {
            return res.json(filteredProducts);
        } else {
            return res.status(404).json({ error: "No products found" })
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

const searchProducts = async (req, res) => {
    try {
        const data = await readDB();
        
        if (!req.params.name) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const requestFromUrl = req.params.name.toLowerCase();
        
        const searchedProducts = data.products.filter(p => p.name.toLowerCase().includes(requestFromUrl));

        if (searchedProducts.length > 0) {
            return res.json(searchedProducts);
        } else {
            return res.status(404).json({ error: "No products found" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

const filterByPriceRange = async (req, res) => {
    try {
        const data = await readDB();
        
        if (req.params.min == null || req.params.max == null) {
            return res.status(400).json({ error: "Min and max price are required" });
        }
        
        const min = parseFloat(req.params.min);
        const max = parseFloat(req.params.max);
        
        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({ error: "Invalid price format" });
        }

        const categoryFromUrl = req.params.category 
            ? req.params.category.toLowerCase() 
            : '';

        let filteredProducts = data.products.filter(p => p.price >= min && p.price <= max);

        if (categoryFromUrl !== '') {
            filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === categoryFromUrl);
        };

        if (filteredProducts.length > 0) {
            return res.json(filteredProducts);
        } else {
            return res.status(404).json({ error: "No products found" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const createProduct = async (req, res) => {
    try {
        const db = await readDB();
        const { name, stock, price, category } = req.body;

        const maxId = db.products.reduce((max, p) => Math.max(max, p.id), 0);
        const newId = maxId + 1;

        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: "Product name is required" });
        };

        if (stock == null) {
            return res.status(400).json({ error: "Stock is required" });
        };

        if (!Number.isInteger(stock) || stock < 0) {
            return res.status(400).json({ error: "Invalid stock" });
        };

        if (price != null) {
            if (!Number.isInteger(price) || price < 0) {
                return res.status(400).json({ error: "Invalid price" });
            }
        }

        const newProduct = {
            id: newId,
            name: name.trim(),
            stock,
            ...(price != null ? { price } : {}),
            ...(typeof category === 'string' && category.trim() !== ''
                ? { category: category.trim().toLowerCase() }
                : {}),
        };

        db.products.push(newProduct);
        await writeDB(db);

        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory,
    lowStock,
    searchProducts,
    filterByPriceRange,
    createProduct
};