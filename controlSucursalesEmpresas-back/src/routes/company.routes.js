'use strict'

const express = require('express');
const api = express.Router();
const companyController = require('../controllers/company.controller'); 
const midAuth = require('../services/auth');

//*ADMIN
api.get('/test', [midAuth.ensureAuth, midAuth.isAdmin], companyController.test);

api.post('/register_OnlyAdmin', [midAuth.ensureAuth, midAuth.isAdmin], companyController.register_OnlyAdmin);

api.get('/getCompany/:id',[midAuth.ensureAuth, midAuth.isAdmin], companyController.getCompany);
api.get('/getCompanies',[midAuth.ensureAuth, midAuth.isAdmin], companyController.getCompanies);

api.put('/update_OnlyAdmin/:id', [midAuth.ensureAuth, midAuth.isAdmin], companyController.update_OnlyAdmin );

api.delete('/delete_OnlyAdmin/:id', [midAuth.ensureAuth, midAuth.isAdmin], companyController.delete_OnlyAdmin);

//*ALL ROLES
api.post('/login', companyController.login);

api.post('/register', companyController.register);

api.get('/myCompany', midAuth.ensureAuth, companyController.myCompany);

api.put('/update', midAuth.ensureAuth, companyController.update);

api.delete('/delete', midAuth.ensureAuth, companyController.delete); 

module.exports = api;