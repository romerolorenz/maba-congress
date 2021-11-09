const { CsvUtil } = require('../api/utilities');
csv = new CsvUtil()
require('dotenv').config();

exports.seed = function (knex) {
  return knex('committeeMembership').del()
    .then(function () {
      return csv.readCsv(process.env.DIR + 'committeeMembership')
        .then(result => {
          return knex('committeeMembership').insert(result);
        })
    });
};