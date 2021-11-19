const { SqlService } = require('../services/SqlService.js');

sqlService = new SqlService()

async function getBill(filter) {
  try {
    return await sqlService.getRow('bill', '*', filter);
  } catch (error) {
    throw error
  }
}

async function updateBill(update, where) {
  try {
    return await sqlService.updateRecord('bill', update, where);
  } catch (error) {
    throw error
  }
}

async function insertBill(details) {
  try {
    return await sqlService.insertRow('bill', details);
  } catch (error) {
    throw error
  }
}

async function insertAuthorship(details) {
  try {
    return await sqlService.insertRow('authorship', details);
  } catch (error) {
    throw error
  }
}

module.exports = {
  getBill,
  updateBill,
  insertBill,
  insertAuthorship
}