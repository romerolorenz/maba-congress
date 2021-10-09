const { SqlService } = require('../services/SqlService.js');

sqlService = new SqlService()

async function batchSaveRepresentative(details) {
  try {
    return await sqlService.batchInsertIfNotExist('representative', 'id', details);
  } catch (error) {
    throw error
  }
}

async function getRepresentative(filter) {
  try {
    return await sqlService.getRow('representative', '*', filter);
  } catch (error) {
    throw error
  }
}

async function updateRepresentative(update, where) {
  try {
    return await sqlService.updateRecord('representative', update, where);
  } catch (error) {
    throw error
  }
}

async function insertRepresentative(details) {
  try {
    return await sqlService.insertRow('representative', details);
  } catch (error) {
    throw error
  }
}

module.exports = {
  getRepresentative,
  updateRepresentative,
  batchSaveRepresentative,
  insertRepresentative
}