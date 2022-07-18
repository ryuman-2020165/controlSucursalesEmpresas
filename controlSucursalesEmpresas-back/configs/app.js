'use strict'

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const companyRoutes = require('../src/routes/company.routes'); 
const branchOfficeRoutes = require('../src/routes/branchOffice.routes');
const productRoutes = require('../src/routes/product.routes');
const branchProductRoutes = require('../src/routes/branchProduct.routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use('/company', companyRoutes); 
app.use('/branchOffice', branchOfficeRoutes);
app.use('/product', productRoutes);
app.use('/branchProduct',branchProductRoutes);

module.exports = app;