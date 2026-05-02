const express = require('express');
const path = require('path');

const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/products', productRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'admin.html'));
});

app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'error', 'error.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user', 'products.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});