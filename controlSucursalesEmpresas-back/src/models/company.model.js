'use strict'
const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: String,
    typeOfCompany: String,
    username: String,
    email: String,
    password: String,
    phone: String,
    role: String,
    products: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Company', companySchema);