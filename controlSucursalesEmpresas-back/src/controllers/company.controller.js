'use strict';

const { validateData, findCompany, checkPassword, encrypt, checkUpdate, checkUpdate_OnlyAdmin, deleteProducts } = require('../utils/validate');
const Company = require('../models/company.model');
const BranchOffice = require('../models/branchOffice.model');
const jwt = require('../services/jwt');

exports.test = (req, res) => {
    return res.send({ message: 'Mensaje de prueba' });
};

exports.register_OnlyAdmin = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            name: params.name,
            typeOfCompany: params.typeOfCompany,
            username: params.username,
            email: params.email,
            password: params.password,
            role: params.role
        };

        const msg = validateData(data);
        if (!msg) {
            const checkCompany = await findCompany(data.username);
            if (!checkCompany) {
                if (params.role != 'ADMIN' && params.role != 'COMPANY') {
                    return res.status(400).send({ message: 'El rol no es válido' })
                } else {
                    data.password = await encrypt(params.password);
                    data.phone = params.phone;

                    let company = new Company(data);
                    await company.save();
                    return res.send({ message: 'Empresa guardado exitosamente', company });
                }
            } else {
                return res.send({ message: 'Nombre de usuario ya esta en uso, utiliza uno diferente' });
            }
        } else {
            return res.status(400).send(msg);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al registrarse' });
    }
};

exports.getCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findOne({ _id: companyId });
        if (!company) {
            return res.status(400).send({ message: 'La empresa ingresada no se ha podido encontrar' })
        } else {
            return res.send({ message: 'Empresa encontrada:', company });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error obteniendo la empresa' });
    }
};

exports.getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        return res.send({ message: 'Empresas encontradas:', companies })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error obteniendo las empresas' });
    }
};

exports.update_OnlyAdmin = async (req, res) => {
    try {
        const companyId = req.params.id;
        const params = req.body;

        const company = await Company.findOne({ _id: companyId })
        if (company) {
            const checkUpdated = await checkUpdate_OnlyAdmin(params);
            if (checkUpdated === false) {
                return res.status(400).send({ message: 'Parámetros no válidos para actualizar' })
            } else {
                const checkRole = await Company.findOne({ _id: companyId })
                if (checkRole.role === 'ADMIN') {
                    return res.status(403).send({ message: 'No puede editar usuarios de rol ADMIN' });
                } else {
                    const checkCompany = await findCompany(params.username);
                    if (checkCompany && company.username != params.username) {
                        return res.status(400).send({ message: 'Este nombre de usuario ya esta en uso' })
                    } else {
                        if (params.role != 'ADMIN' && params.role != 'COMPANY') {
                            return res.status(400).send({ message: 'El rol ingresado no es valido' })
                        } else {
                            const updateCompany = await Company.findOneAndUpdate({ _id: companyId }, params, { new: true }).lean();
                            if (!updateCompany) {
                                return res.status(400).send({ message: 'No se ha podido actualizar la empresa' })
                            } else {
                                return res.send({ message: 'Empresa actualizada', updateCompany })
                            }
                        }
                    }
                }
            }
        } else {
            return res.status(400).send({ message: 'Esta empresa no existe' })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error actualizando la empresa' });
    }
};

exports.delete_OnlyAdmin = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findOne({ _id: companyId });
        if (!company) {
            return res.status(400).send({ message: 'Empresa no encontrada' })
        } else {
            if (company.role === 'ADMIN') {
                return res.status(403).send({ message: 'No puede eliminar usuarios de rol ADMIN' });
            } else {
                await BranchOffice.deleteMany({ company: companyId })
                deleteProducts(company.products);
                const deleteCompany = await Company.findOneAndDelete({ _id: companyId });
                if (!deleteCompany) {
                    return res.status(500).send({ message: 'Empresa no encontrada o ya ha sido eliminada' })
                } else {
                    return res.send({ message: 'Empresa eliminada' })
                }
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error eliminando la empresa' });
    }
};

exports.login = async (req, res) => {
    try {
        const params = req.body;
        let data = {
            username: params.username,
            password: params.password,
        };

        let msg = validateData(data);
        if (!msg) {
            let checkCompany = await findCompany(params.username);
            let checkPass = await checkPassword(params.password, checkCompany.password);
            delete checkCompany.password;

            if (checkCompany && checkPass) {
                const token = await jwt.createToken(checkCompany);
                return res.send({ message: 'Sesión iniciada', token, checkCompany });
            } else {
                return res.status(400).send({ message: 'El nombre de usuario y/o contraseña incorrectos' });
            }
        } else {
            return res.status(404).send(msg);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'El nombre de usuario y/o contraseña incorrectos' });
    }
};

exports.register = async (req, res) => {
    try {
        const params = req.body;
        let data = {
            name: params.name,
            typeOfCompany: params.typeOfCompany,
            username: params.username,
            email: params.email,
            password: params.password,
            role: 'COMPANY'
        };
        let msg = validateData(data);

        if (!msg) {
            let checkCompany = await findCompany(data.username);
            if (!checkCompany) {
                data.password = await encrypt(params.password);
                data.phone = params.phone;

                let company = new Company(data);
                await company.save();
                return res.send({ message: 'Empresa registrada' });
            } else {
                return res.status(400).send({ message: 'Nombre de usuario ya esta en uso, utiliza uno diferente' });
            }
        } else {
            return res.status(400).send(msg);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al registrarse' });
    }
};

exports.myCompany = async (req, res) => {
    try {
        const companyId = req.user.sub;
        const company = await Company.findOne({ _id: companyId }).lean();
        delete company.products;
        delete company.password;
        delete company.role;
        delete company.__v
        if (!company) {
            return res.status(400).send({ message: 'La empresa ingresada no se ha podido encontrar' })
        } else {
            return res.send({ message: 'Esta es tu empresa: ', company });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error obteniendo la empresa' });
    }
};

exports.update = async (req, res) => {
    try {
        const companyId = req.user.sub;
        const params = req.body;

        const company = await Company.findOne({ _id: companyId })
        if (company) {
            const checkUpdated = await checkUpdate(params);
            if (checkUpdated === false) {
                return res.status(400).send({ message: 'Parámetros no válidos para actualizar' })
            } else {
                const checkRole = await Company.findOne({ _id: companyId })
                if (checkRole.role === 'ADMIN') {
                    return res.status(403).send({ message: 'No puedes editar tu usuario si tienes el rol ADMIN' });
                } else {
                    const checkCompany = await findCompany(params.username);
                    if (checkCompany && company.username != params.username) {
                        return res.status(400).send({ message: 'Este nombre de usuario ya esta en uso' })
                    } else {
                        const updateCompany = await Company.findOneAndUpdate({ _id: companyId }, params, { new: true }).lean();
                        if (!updateCompany) {
                            return res.status(400).send({ message: 'No se ha podido actualizar la empresa' })
                        } else {
                            return res.send({ message: 'Empresa actualizada', updateCompany })
                        }
                    }
                }
            }
        } else {
            return res.status(400).send({ message: 'Esta empresa no existe' })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error actualizando la empresa' });
    }
};

exports.delete = async (req, res) => {
    try {
        const companyId = req.user.sub;

        const company = await Company.findOne({ _id: companyId }).populate('products')
        if (company.role === 'ADMIN') {
            return res.status(403).send({ message: 'No puede eliminar usuarios de rol ADMIN' });
        } else {
            await BranchOffice.deleteMany({ company: companyId })
            deleteProducts(company.products);
            const deleteCompany = await Company.findOneAndDelete({ _id: companyId });
            if (!deleteCompany) {
                return res.status(500).send({ message: 'Empresa no encontrada' })
            } else {
                return res.send({ message: 'Cuenta eliminada' })
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error eliminando la empresa' });
    }
};