'use strict'

const express = require('express');
const api = express.Router();
const midAuth = require('../services/auth');   
const branchProductController = require('../controllers/branchProduct.controller'); 

api.post('/addBranchProducts', midAuth.ensureAuth, branchProductController.addBranchProduct); 

api.post('/sellProduct', midAuth.ensureAuth, branchProductController.sellProduct); 

api.get('/getBranchProduct/:branchId/:branchProductId',midAuth.ensureAuth, branchProductController.getBranchProduct);
api.get('/getBranchProducts/:branchId',midAuth.ensureAuth, branchProductController.getBranchProducts);
api.get('/getBranchProducts_OrderBySales/:branchId',midAuth.ensureAuth, branchProductController.getBranchProducts_OrderBySales);

module.exports = api;


