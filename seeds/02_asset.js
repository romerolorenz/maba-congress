const { CsvUtil } = require('../api/utilities');
csv = new CsvUtil()
require('dotenv').config();

exports.seed = function (knex) {
  return knex('asset').del()
    .then(function () {
      return csv.readCsv(process.env.DIR + 'asset')
        .then(result => {
          for(let i = 0; i < result.length; i++) {
            result[i].date = new Date(result[i].date)
          }
          return knex('asset').insert(result);
        })
    });
};