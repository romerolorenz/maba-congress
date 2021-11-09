const { CsvUtil } = require('../api/utilities');
csv = new CsvUtil()
require('dotenv').config();

exports.seed = function (knex) {
  return knex('representative').del()
    .then(function () {
      return csv.readCsv(process.env.DIR + 'representative')
        .then(result => {
          return knex('representative').insert(result);
        })
    });
};