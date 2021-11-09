const { CsvUtil } = require('../api/utilities');
csv = new CsvUtil()
require('dotenv').config();

exports.seed = function (knex) {
  return knex('bill').del()
    .then(function () {
      return csv.readCsv(process.env.DIR + 'bill')
        .then(result => {
          for(let i = 0; i < result.length; i++) {
            result[i].dateRead = new Date(result[i].dateRead)
            result[i].dateFiled = new Date(result[i].dateFiled)
            if(result[i].dateUrgent == '') {
              result[i].dateUrgent = null
            } else {
              result[i].dateUrgent = new Date(result[i].dateUrgent)
            }
          }
          return knex('bill').insert(result);
        })
    });
};