const { CsvUtil } = require('../api/utilities');
csv = new CsvUtil()
require('dotenv').config();

exports.seed = function (knex) {
  return knex('representative').del()
    .then(function () {
      return csv.readCsv(process.env.DIR + 'representative')
        .then(result => {
          for(let i = 0; i < result.length; i++) {
            if(result[i].district == '') {
              result[i].district = null
            } 
          }
          return knex('representative').insert(result);
        })
    });
};