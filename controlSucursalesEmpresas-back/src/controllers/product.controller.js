'use strict'

const { validateData, checkUpdateProduct, findProductOnCompany } = require('../utils/validate');
const Company = require('../models/company.model');
const Product = require('../models/product.model');

exports.testProduct = (req, res) => {
    return res.send({ message: 'Mensaje de prueba desde el controlador de productos' });
}

exports.addProduct = async (req, res) => {
    try {
        const params = req.body;
        const company = await Company.findOne({ _id: req.user.sub });
        const data = {
            name: params.name,
            provider: params.provider,
            stock: params.stock
        }
        const msg = validateData(data);
        if (!msg) {
            const product = new Product(data);
            await product.save();
            await company.products.push(product);
            await company.save();
            return res.send({ message: 'Producto creado satisfactoriamente', product });
        } else {
            return res.status(400).send(msg);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al crear el producto' });
    }
}

exports.getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const company = await Company.findOne({ _id: req.user.sub });
        const checkProduct = await Product.findOne({ _id: productId });
        if (checkProduct) {
            const checkUserProduct = await findProductOnCompany(company, checkProduct._id);
            if (checkUserProduct) {
                return res.send({ message: 'Producto encontrado:', checkProduct });
            } else {
                return res.status(400).send({ message: 'No eres el propietario de este producto' });
            }
        } else {
            return res.status(400).send({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error buscando el producto' });
    }
}

exports.getProducts = async (req, res) => {
    try {
        const company = await Company.findOne({ _id: req.user.sub }).populate('products');
        const products = company.products
        if (products) {
            return res.send({ message: 'Productos encontrados:', products })
        } else {
            return res.status(400).send({ message: 'No se ha encontrado ningún producto' })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error buscando los productos' });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const params = req.body;

        const company = await Company.findOne({ _id: req.user.sub });
        const checkProduct = await Product.findOne({ _id: productId })
        if (checkProduct) {
            const checkUpdated = await checkUpdateProduct(params);
            if (checkUpdated) {
                const checkCompanyProduct = await findProductOnCompany(company, checkProduct._id)
                if (checkCompanyProduct) {
                    const updateProduct = await Product.findOneAndUpdate({ _id: productId }, params, { new: true });
                    if (updateProduct) {
                        return res.send({ message: 'Producto Actualizado:', updateProduct });
                    } else {
                        return res.status(400).send({ message: 'No se ha podido actualizar el producto' });
                    }
                } else {
                    return res.status(400).send({ message: 'No eres el propietario de este producto' });
                }
            } else {
                return res.status(400).send({ message: 'Parámetros inválidos' });
            }
        } else {
            return res.status(400).send({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error actualizando el producto' });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const company = await Company.findOne({ _id: req.user.sub });
        const checkProduct = await Product.findOne({ _id: productId });
        if (checkProduct) {
            const checkCompanyProduct = await findProductOnCompany(company, checkProduct._id);
            if (checkCompanyProduct) {
                const productDeleted = await Product.findOneAndDelete({ _id: productId });
                await company.products.pull(checkCompanyProduct);
                await company.save();
                return res.send({ message: 'Producto eliminado ', productDeleted });
            } else {
                return res.status(400).send({ message: 'No eres el propietario de este producto' });
            }
        } else {
            return res.status(400).send({ message: 'Producto no encontrado o ya eliminado' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al borrar el producto' });
    }
}

exports.getProducts_OrderByStockAsc = async (req, res) => {
    try {
        const company = await Company.findOne({ _id: req.user.sub }).populate('products');
        const products = company.products.sort((a, b) => {
            return a.stock - b.stock
        })
        if (products === null || products === undefined) {
            return res.send({ message: 'No se ha encontrado ningún producto' })
        } else {
            return res.send({ message: 'Productos encontrados:', products })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error buscando los productos' });
    }
}

exports.getProducts_OrderByStockDesc = async (req, res) => {
    try {
        const company = await Company.findOne({ _id: req.user.sub }).populate('products');
        const products = company.products.sort((a, b) => {
            return b.stock - a.stock
        })
        if (products === null || products === undefined) {
            return res.send({ message: 'No se ha encontrado ningún producto' })
        } else {
            return res.send({ message: 'Productos encontrados:', products })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error buscando los productos' });
    }
}

exports.getProducts_OrderByProductNameAsc = async (req, res) => {
    try {
        const company = await Company.findOne({ _id: req.user.sub }).populate('products');

        const products = company.products.sort((a, b) => {
            let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA > nameB) {
                return -1;
            }
        })

        if (products === null || products === undefined) {
            return res.send({ message: 'No se ha encontrado ningún producto' })
        } else {
            return res.send({ message: 'Productos encontrados:', products })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error buscando los productos' });
    }
}

exports.getProducts_OrderByProductNameDesc = async (req, res) => {
    try {
        const company = await Company.findOne({ _id: req.user.sub }).populate('products');

        const products = company.products.sort((a, b) => {
            let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })

        if (products === null || products === undefined) {
            return res.send({ message: 'No se ha encontrado ningún producto' })
        } else {
            return res.send({ message: 'Productos encontrados:', products })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error buscando los productos' });
    }
}

exports.getProducts_OrderByProductProviderAsc = async (req, res) => {
    try {
        const company = await Company.findOne({ _id: req.user.sub }).populate('products');
        const products = company.products.sort((a, b) => {
            let providerA = a.provider.toLowerCase(), providerB = b.provider.toLowerCase();
            if (providerA > providerB) {
                return -1;
            }
        })
        if (products === null || products === undefined) {
            return res.send({ message: 'No se ha encontrado ningún producto' })
        } else {
            return res.send({ message: 'Productos encontrados:', products })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error buscando los productos' });
    }
}

exports.getProducts_OrderByProductProviderDesc = async (req, res) => {
    try {
        const company = await Company.findOne({ _id: req.user.sub }).populate('products');
        const products = company.products.sort((a, b) => {
            let providerA = a.provider.toLowerCase(), providerB = b.provider.toLowerCase();
            if (providerA < providerB) {
                return -1;
            }
        })
        if (products === null || products === undefined) {
            return res.send({ message: 'No se ha encontrado ningún producto' })
        } else {
            return res.send({ message: 'Productos encontrados:', products })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error buscando los productos' });
    }
}