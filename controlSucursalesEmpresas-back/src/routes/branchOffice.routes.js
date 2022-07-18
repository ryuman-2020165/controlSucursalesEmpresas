'use strict'

const express = require('express');
const api = express.Router();
const midAuth = require('../services/auth');
const brachOfficeController = require('../controllers/branchOffice.controller');

api.get('/testBranchOffice', [midAuth.ensureAuth, midAuth.isAdmin], brachOfficeController.testBranchOffice);

api.post('/addBranchOffice', midAuth.ensureAuth, brachOfficeController.addBranchOffice);

api.get('/getBranchOffice/:id', midAuth.ensureAuth, brachOfficeController.getBranchOffice);
api.get('/getBranchOffices/', midAuth.ensureAuth, brachOfficeController.getBranchOffices);

api.put('/updateBranchOffice/:id', midAuth.ensureAuth, brachOfficeController.updateBranchOffice);

api.delete('/deleteBranchOffice/:id', midAuth.ensureAuth, brachOfficeController.deleteBranchOffice);


module.exports = api;