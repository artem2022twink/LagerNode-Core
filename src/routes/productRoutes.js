const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/', productController.createProduct);

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.get('/category/:category', productController.getProductByCategory);

router.get('/low-stock/:amount', productController.lowStock);

router.get('/search/:name', productController.searchProducts);

router.get('/price-range/:min/:max', productController.filterByPriceRange);

router.get('/price-range/:min/:max/:category', productController.filterByPriceRange);

module.exports = router;