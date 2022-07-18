'use strict'

const { validateData, findStockOfProductBranch, findProductOnBranch, findProductPosition, findProductOnCompany, findBranchProduct } = require('../utils/validate');
const Company = require('../models/company.model')
const BranchOffice = require('../models/branchOffice.model');
const Product = require('../models/product.model');

exports.addBranchProduct = async (req, res) => {
    try {
        const params = req.body;
        const companyId = req.user.sub;
        let data = {
            branchOffice: params.branchOffice,
            product: params.product,
            stock: params.stock,
            sales: 0
        }
        let msg = validateData(data);
        if (!msg) {
            const checkBranch = await BranchOffice.findOne({ _id: data.branchOffice });
            if (checkBranch === null || checkBranch.company != companyId) {
                return res.status(400).send({ message: 'No puedes agregar productos a esta sucursal' })
            } else {
                const company = await Company.findOne({ _id: companyId })
                const checkProduct = await Product.findOne({ _id: data.product });
                const productCheck = await findProductOnCompany(company, checkProduct._id);
                if (productCheck) {
                    if (data.stock > checkProduct.stock) {
                        return res.status(400).send({ message: 'No hay suficientes existencias' });
                    } else {
                        const checkProductOnBranch = await findProductOnBranch(checkBranch, data.product);
                        if (checkProductOnBranch) {
                            const productStock = await findStockOfProductBranch(checkBranch, data.product);

                            const stockProduct = (checkProduct.stock - data.stock)
                            await Product.findOneAndUpdate({ _id: data.product }, { stock: stockProduct }, { new: true });

                            const dataStock = Number(data.stock)
                            const finalStock = productStock + dataStock
                            data.stock = finalStock;

                            const checkProductPosition = await findProductPosition(checkBranch, data.product)

                            const positionId = (await checkBranch.branchProducts[checkProductPosition]._id).toString();

                            const updateBranchProduct = await BranchOffice.findOneAndUpdate({ _id: data.branchOffice, 'branchProducts._id': positionId }, { $set: { 'branchProducts.$.stock': data.stock } }, { new: true })

                            return res.send({ message: 'Producto añadido a la sucursal correctamente', updateBranchProduct })
                        } else {
                            await checkBranch.branchProducts.push(data);
                            await checkBranch.save();

                            const stockProduct = (checkProduct.stock - data.stock)
                            await Product.findOneAndUpdate({ _id: data.product }, { stock: stockProduct }, { new: true });

                            return res.send({ message: 'Producto añadido a la sucursal correctamente', checkBranch });
                        }
                    }
                } else {
                    return res.status(400).send({ message: 'No eres el propietario de este producto' });
                }
            }
        } else {
            return res.status(400).send(msg);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al enviar el producto' });
    }
}

exports.sellProduct = async (req, res) => {
    try {
        const params = req.body;
        const companyId = req.user.sub;
        let data = {
            amount: params.amount,
            branchOfficeId: params.branchOfficeId,
            branchProductId: params.branchProductId
        }
        let msg = validateData(data);
        if (!msg) {
            const checkBranch = await BranchOffice.findOne({ _id: data.branchOfficeId });
            if (checkBranch === null || checkBranch.company != companyId) {
                return res.status(400).send({ message: 'Esta sucursal no pertence a la empresa' })
            } else {
                const branch = await BranchOffice.findOne({ _id: data.branchOfficeId });
                const branchProduct = branch.branchProducts.id(data.branchProductId)

                if (branchProduct === null || branchProduct === undefined) {
                    return res.status(400).send({ message: 'No se ha encontrado el producto en la sucursal' });
                } else {
                    if (data.amount > branchProduct.stock) {
                        return res.status(400).send({ message: 'No hay suficientes existencias' });
                    } else {
                        const finalStock = (branchProduct.stock - data.amount)
                        branch.branchProducts.id(data.branchProductId).stock = finalStock
                        branch.branchProducts.id(data.branchProductId).sales = parseInt(parseInt(branch.branchProducts.id(data.branchProductId).sales) + parseInt(data.amount))
                        await branch.save();
                        return res.send({ message: 'Producto vendido' });
                    }
                }
            }
        } else {
            return res.status(400).send(msg);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error al vender producto' });
    }
}

exports.getBranchProduct = async (req, res) => {
    try {
        const branchId = req.params.branchId;
        const branchProductId = req.params.branchProductId
        const companyId = req.user.sub;

        const checkBranch = await BranchOffice.findOne({ _id: branchId });
        if (checkBranch === null || checkBranch.company != companyId) {
            return res.status(400).send({ message: 'Esta sucursal no pertence a la empresa' })
        } else {
            const branch = await BranchOffice.findOne({ _id: branchId });
            const branchProduct = branch.branchProducts.id(branchProductId)

            if (branchProduct === null || branchProduct === undefined) {
                return res.status(400).send({ message: 'No se ha encontrado el producto en la sucursal' });
            } else {
                return res.send({ message: 'Producto encontrado:', branchProduct });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error obteninedo el producto' });
    }
}

exports.getBranchProducts = async (req, res) => {
    try {
        const branchId = req.params.branchId;
        const companyId = req.user.sub;

        const checkBranch = await BranchOffice.findOne({ _id: branchId });
        if (checkBranch === null || checkBranch.company != companyId) {
            return res.status(400).send({ message: 'Esta sucursal no pertence a la empresa' })
        } else {
            const branch = await BranchOffice.findOne({ _id: branchId }).populate('branchProducts').populate('branchProducts.product');
            const branchProducts = await branch.branchProducts
            if (branch === null || branch === undefined) {
                return res.status(400).send({ message: 'No se han encontrado productos en la sucursal' });
            } else {
                return res.send({ message: 'Productos encontrados:', branchProducts });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error obteniendo los productos' });
    }
}

exports.getBranchProducts_OrderBySales = async (req, res) => {
    try {
        const branchId = req.params.branchId;
        const companyId = req.user.sub;

        const checkBranch = await BranchOffice.findOne({ _id: branchId });
        if (checkBranch === null || checkBranch.company != companyId) {
            return res.status(400).send({ message: 'Esta sucursal no pertence a la empresa' })
        } else {
            const branch = await BranchOffice.findOne({ _id: branchId }).populate('branchProducts').populate('branchProducts.product');
            const branchProducts = await branch.branchProducts.sort((a, b) => {
                return b.sales - a.sales
            })
            if (branch === null || branch === undefined) {
                return res.status(400).send({ message: 'No se han encontrado productos en la sucursal' });
            } else {
                return res.send({ message: 'Productos encontrados:', branchProducts });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error obteniendo los productos' });
    }
}