require('dotenv').config()

const companyController = require('./src/controllers/company.controller');
const founderController = require('./src/controllers/founder.controller');

const createCompany = async (event, context) => {
    const res = await companyController.createCompany(event);
    return res
}

const updateCompany = async (event, context) => {
    const res = await companyController.updateCompany(event);
    return res
}

const listCompanies = async (event, context) => {
    const res = await companyController.listCompanies(event);
    return res
}

const getCompany = async (event, context) => {
    const res = await companyController.getCompany(event);
    return res

}
const deleteCompany = async (event, context) => {
    const res = await companyController.deleteCompany(event);
    return res
}

const addFounder = async (event, context) => {
    const res = await founderController.addFounder(event);
    return res
}

module.exports = {
    createCompany,
    updateCompany,
    listCompanies,
    getCompany,
    deleteCompany,
    addFounder
}
