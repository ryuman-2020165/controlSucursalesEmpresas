'use strict'

const mongoConfig = require('./configs/mongoConfig');
const app = require('./configs/app');
const port = 3200;

const { findCompany, encrypt } = require('./src/utils/validate');
const Company = require('./src/models/company.model');

mongoConfig.init();

app.listen(port, async () => {
    console.log(`Servidor HTTP corriendo en el puerto ${port}`);

    let data = {
        name: 'ADMIN',
        typeOfCompany: 'ADMIN',
        username: 'SuperAdmin',
        email: 'ADMIN',
        password: await encrypt('123456'),
        phone: '12345678',
        role: 'ADMIN'
    };

    let checkCompany = await findCompany(data.username);
    if (!checkCompany) {
        let company = new Company(data);
        await company.save();
        console.log('Usuario ADMIN registrado')
    }
});