const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'data', 'dataBase.json');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('LagerNode Core is online.');
});

app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});