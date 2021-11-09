const { CsvUtil } = require('../api/utilities');
csv = new CsvUtil()
require('dotenv').config();

exports.seed = function (knex) {
  return knex('authorship').del()
    .then(function () {
      return csv.readCsv(process.env.DIR + 'authorship')
        .then(result => {
          return knex('authorship').insert(result);
        })
    });
};