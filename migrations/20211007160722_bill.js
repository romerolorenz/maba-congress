
exports.up = async function(knex) {
    if (!(await knex.schema.hasTable('bill'))) {
      await knex.schema
          .createTable('bill', function(t) {
            t.string('billNumber').primary();
            t.date('dateFiled');
            t.date('dateRead');
            t.date('dateUrgent');
            t.varchar('motherBillStatus');
            t.varchar('primaryReferralCommittee');
            t.foreign('primaryReferralCommittee').references('committee.committee');
            t.varchar('shortTitle');
            t.varchar('status');
          })
          .then((result) => {
            console.log('bill table created');
          })
          .catch((error) => {
            console.log(error);
          });
    }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('bill');
};