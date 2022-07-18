'use strict'
const mongoose = require('mongoose');

const branchOffice = mongoose.Schema({
    company: { type: mongoose.Schema.ObjectId, ref: 'Company' },
    name: String,
    address: String,
    branchProducts: [{
        product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
        stock: Number,
        sales: Number
    }]
});

module.exports = mongoose.model('BranchOffice', branchOffice);