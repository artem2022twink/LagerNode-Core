const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);

router.get('/id/:id', productController.getProductById);

router.get('/category/:category', productController.getProductByCategory);

router.get('/category/:category/price/:price', productController.filterCategoryByPrice);

router.get('/price/:price', productController.filterAllByPrice);

router.get('/low-stock/:amount', productController.lowStock);

module.exports = router;