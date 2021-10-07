
exports.up = async function(knex) {
    if (!(await knex.schema.hasTable('authorship'))) {
      await knex.schema
          .createTable('authorship', function(t) {
            t.string('billNumber');
            t.foreign('billNumber').references('bill.billNumber');
            t.integer('representativeId').unsigned();
            t.foreign('representativeId').references('representative.id');
            t.string('authorship')
            t.primary(['billNumber', 'representativeId']);
          })
          .then((result) => {
            console.log('authorship table created');
          })
          .catch((error) => {
            console.log(error);
          });
    }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('authorship');
};