'use strict'

const Company = require('../models/company.model');
const Product = require('../models/product.model');
const bcrypt = require('bcrypt-nodejs');

exports.validateData = (data) => {
    let keys = Object.keys(data),
        msg = '';

    for (let key of keys) {
        if (data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
        msg += `El parámetro ${key} es obligatorio\n`
    }
    return msg.trim();
}

//* Empresas ---------------------------------------------------------------------------------------

exports.findCompany = async (username) => {
    try {
        let exist = await Company.findOne({ username: username }).lean();
        return exist;
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.checkPassword = async (password, hash) => {
    try {
        return bcrypt.compareSync(password, hash);
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.encrypt = async (password) => {
    try {
        return bcrypt.hashSync(password);
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.checkUpdate = async (params) => {
    try {
        if (params.password || Object.entries(params).length === 0 || params.role || params.products) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.checkUpdate_OnlyAdmin = async (params) => {
    try {
        if (Object.entries(params).length === 0 || params.password) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.deleteProducts = async (products) => {
    try {
        for (let product of products) {
            let productId = product._id.toString()
            await Product.findOneAndDelete({ _id: productId })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//* Productos ---------------------------------------------------------------------------------------

exports.checkUpdateProduct = async (params) => {
    try {
        if (Object.entries(params).length === 0) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.findProductOnCompany = async (company, product) => {
    try {
        const products = company.products;

        let keys = Object.keys(products);

        for (let key of keys) {
            if (products[key].toString() !== product.toString()) {
                continue;
            } else {
                return products[key]._id;
            }
        }
        return undefined
    } catch (err) {
        console.log(err);
        return err;
    }
}

//* Sucursal ---------------------------------------------------------------------------------------

exports.checkUpdateBranch = async (params) => {
    try {
        if (Object.entries(params).length === 0 || params.branchProducts || params.company) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//* Productos de una sucursal ---------------------------------------------------------------------------------------

exports.findProductOnBranch = async (branch, product) => {
    const branchProducts = branch.branchProducts;
    let keys = Object.keys(branchProducts);

    for (let key of keys) {
        if (branchProducts[key].product.toString() !== product.toString()) {
            continue;
        } else {
            return branchProducts[key];
        }
    }
    return undefined
}

exports.findStockOfProductBranch = async (branch, product) => {
    const branchProducts = branch.branchProducts;
    let keys = Object.keys(branchProducts);

    for (let key of keys) {
        if (branchProducts[key].product.toString() !== product.toString()) {
            continue;
        } else {
            return branchProducts[key].stock;
        }
    }
    return undefined
}

exports.findProductPosition = async (branch, product) => {
    const branchProducts = branch.branchProducts;
    let keys = Object.keys(branchProducts);

    for (let key of keys) {
        if (branchProducts[key].product.toString() !== product.toString()) {
            continue;
        } else {
            return key;
        }
    }
    return undefined
}

exports.findBranchProduct = async (branch, branchProductId) => {
    const branchProducts = branch.branchProducts;
    let keys = Object.keys(branchProducts);

    for (let key of keys) {
        if (branchProducts[key]._id.toString() !== branchProductId.toString()) {
            continue;
        } else {
            return branchProducts[key];
        }
    }
    return undefined
}