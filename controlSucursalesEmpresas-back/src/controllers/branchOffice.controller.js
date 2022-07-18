'use strict'

const { validateData, checkUpdateBranch } = require('../utils/validate');
const BranchOffice = require('../models/branchOffice.model');

exports.testBranchOffice = (req, res) => {
    return res.send({ message: 'Mensaje de prueba desde el controlador de sucursal' });
}

exports.addBranchOffice = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            company: req.user.sub,
            name: params.name,
            address: params.address
        }
        const msg = validateData(data);
        if (!msg) {
            const branchOffice = new BranchOffice(data);
            await branchOffice.save();
            return res.send({ message: 'Sucursal creada satisfactoriamente', branchOffice });
        } else {
            return res.status(400).send(msg);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error al guardar sucursal' });
    }
}

exports.getBranchOffices = async (req, res) => {
    try {
        const companyId = req.user.sub
        const branchOffices = await BranchOffice.find({ company: companyId });

        if (!branchOffices) {
            return res.status(400).send({ message: 'Sucursales no encontradas' });
        } else {
            return res.send({ message: 'Sucursales encontradas', branchOffices })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error obteniendo las Sucursales' });
    }
}

exports.getBranchOffice = async (req, res) => {
    try {
        const branchOfficeId = req.params.id;
        const companyId = req.user.sub

        const checkCompanyBranch = await BranchOffice.findOne({ _id: branchOfficeId }).lean();
        if (checkCompanyBranch === null || checkCompanyBranch.company != companyId) {
            return res.status(400).send({ message: 'No puedes ver la sucursal' });
        } else {
            const branchOffice = await BranchOffice.findOne({ _id: branchOfficeId });
            if (!branchOffice) {
                return res.status(400).send({ message: 'Sucursal no encontrada' });
            } else {
                return res.send({ message: 'Sucursal encontrada:', branchOffice })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error al buscar sucursal' });;
    }
}

exports.updateBranchOffice = async (req, res) => {
    try {
        const branchOfficeId = req.params.id;
        const params = req.body;
        const companyId = req.user.sub

        const checkCompanyBranch = await BranchOffice.findOne({ _id: branchOfficeId })
        if (checkCompanyBranch === null || checkCompanyBranch.company != companyId) {
            return res.status(400).send({ message: 'No puedes actualizar esta sucursal' })
        } else {
            const checkUpdate = await checkUpdateBranch(params);
            if (!checkUpdate) {
                return res.status(400).send({ message: 'Parámetros invalidos' })
            } else {
                const updateBranchOffice = await BranchOffice.findOneAndUpdate({ _id: branchOfficeId }, params, { new: true }).lean();
                if (!updateBranchOffice) {
                    return res.status(400).send({ message: 'No se ha podido actualizar la sucursal' })
                } else {
                    return res.send({ message: 'Sucursal actualizada', updateBranchOffice });
                }
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error actualizando la sucursal' })
    }
}

exports.deleteBranchOffice = async (req, res) => {
    try {
        const companyId = req.user.sub;
        const branchOfficeId = req.params.id;
        const checkCompanyBranch = await BranchOffice.findOne({ _id: branchOfficeId });

        if (checkCompanyBranch.company != companyId || checkCompanyBranch === null) {
            return res.status(400).send({ message: 'No puedes eliminar esta sucursal o ya fue eliminada' })
        } else {
            const deleteBranchOffice = await BranchOffice.findOneAndDelete({ _id: branchOfficeId });
            if (!deleteBranchOffice) {
                return res.status(500).send({ message: 'Sucursal no encontrada o ya eliminada' })
            } else {
                return res.send({ message: 'Sucursal eliminada exitosamente' })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error eliminando la sucursal' });;
    }
}
