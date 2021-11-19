const { SqlService } = require('../services/SqlService.js');

sqlService = new SqlService()

async function getAsset(filter) {
  try {
    return await sqlService.getRow('asset', '*', filter);
  } catch (error) {
    throw error
  }
}

async function insertAsset(details) {
  try {
    return await sqlService.insertRow('asset', details);
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAsset,
  insertAsset
}