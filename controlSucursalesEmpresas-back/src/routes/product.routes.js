'use strict'

const express = require('express');
const api = express.Router();
const productController = require('../controllers/product.controller');
const midAuth = require('../services/auth');

// ADMIN
api.get('/test', midAuth.ensureAuth, productController.testProduct);

api.post('/addProduct', midAuth.ensureAuth, productController.addProduct);

api.get('/getProduct/:id', midAuth.ensureAuth, productController.getProduct);
api.get('/getProducts', midAuth.ensureAuth, productController.getProducts);

api.put('/updateProduct/:id', midAuth.ensureAuth, productController.updateProduct);

api.delete('/deleteProduct/:id', midAuth.ensureAuth, productController.deleteProduct);

api.get('/getProducts_OrderByStockAsc',midAuth.ensureAuth, productController.getProducts_OrderByStockAsc);
api.get('/getProducts_OrderByStockDesc',midAuth.ensureAuth, productController.getProducts_OrderByStockDesc);

api.get('/getProducts_OrderByProductNameAsc',midAuth.ensureAuth, productController.getProducts_OrderByProductNameAsc);
api.get('/getProducts_OrderByProductNameDesc',midAuth.ensureAuth, productController.getProducts_OrderByProductNameDesc);

api.get('/getProducts_OrderByProductProviderAsc',midAuth.ensureAuth, productController.getProducts_OrderByProductProviderAsc);
api.get('/getProducts_OrderByProductProviderDesc',midAuth.ensureAuth, productController.getProducts_OrderByProductProviderDesc);

module.exports = api;