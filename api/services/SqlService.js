require('dotenv').config();
const _ = require('lodash');
const knex_params = require('../../knexfile.js');

const knex = require('knex')(knex_params);
 

class SqlService {
  async getMaxValue(table, column) {
    let row = await knex(table).max(column).first()
    return row['max(`'+ column +'`)']
  }

  async insertIfNotExist(table, column, field, data) {
    let rows = await knex(table).select().where(column, field);
    if(rows.length == 0) {
      return await knex(table).insert(data)
    } else {
      throw new Error(`[ERROR][${table}]:${field} already exists`)
    }
  }

  async batchInsertIfNotExist(table, column, data) {
    let rows = await knex(table).select(column)
    let tempRows = []
    let tempData = []
    let finalData = []

    for (let line of data) {
      tempData.push(line[column])
    }
    for (let line of rows) {
      tempRows.push(line[column])
    }

    let difference = _.difference(tempData, tempRows)
    
    if(difference.length == data.length) {
      return await knex.batchInsert(table, data)
    } else {
      for(let item of difference) {
        let i = tempData.indexOf(item)
        finalData.push(data[i])
      }
  
      return await knex.batchInsert(table, finalData)
    }
  }

  async updateRecord(table, update, where, inColumn = '', inValues = []) {
    console.log(`Updating ${table} table`);

    return await knex(table).where(where).whereIn(inColumn, inValues).update(update);
  }
}



module.exports = {
  knex,
  SqlService
}