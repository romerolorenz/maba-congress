const { CsvUtil } = require('../api/utilities');
csv = new CsvUtil()
require('dotenv').config();

exports.seed = function (knex) {
  return knex('committee').del()
    .then(function () {
      return csv.readCsv(process.env.DIR + 'committee')
        .then(result => {
          return knex('committee').insert(result);
        })
    });
};