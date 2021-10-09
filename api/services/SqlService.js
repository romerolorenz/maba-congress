require('dotenv').config();
const _ = require('lodash');
const knex_params = require('../../knexfile.js');
const { pickBy, isEmpty, isNil } = require('lodash');

const knex = require('knex')(knex_params);


class SqlService {
  async getMaxValue(table, column) {
    let row = await knex(table).max(column).first()
    return row['max(`' + column + '`)']
  }

  async getRow(table, column, filterQuery) {
    try {
      let row = await knex(table).select(column).where(pickBy(filterQuery, (query) => !isNil(query) && query !== ''))
      return row
    } catch (error) {
      throw error
    }
  }

  async insertRow(table, data) {
    try {
      return await knex(table).insert(data);
    } catch (error) {
      throw error
    }
  }

  async insertIfNotExist(table, column, field, data) {
    let rows = await knex(table).select().where(column, field);
    if (rows.length == 0) {
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
      tempData.push(line[column].toString())
    }
    for (let line of rows) {
      tempRows.push(line[column].toString())
    }

    let difference = _.difference(tempData, tempRows)

    if (difference.length == data.length) {
      return await knex.batchInsert(table, data, 100)
    } else {
      for (let item of difference) {
        let i = tempData.indexOf(item)
        finalData.push(data[i])
      }
      return await knex.batchInsert(table, finalData, 100)
    }
  }

  async updateRecord(table, update, where) {
    console.log(`Updating ${table} table`);

    return await knex(table).where(where).update(update);
  }
}



module.exports = {
  knex,
  SqlService
}