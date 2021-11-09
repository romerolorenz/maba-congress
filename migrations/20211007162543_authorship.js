
exports.up = async function(knex) {
    if (!(await knex.schema.hasTable('authorship'))) {
      await knex.schema
          .createTable('authorship', function(t) {
            t.string('billNumber');
            t.foreign('billNumber').references('bill.billNumber')
              .onUpdate('CASCADE')
              .onDelete('CASCADE');
            t.integer('representativeId').unsigned();
            t.foreign('representativeId').references('representative.id')
              .onUpdate('CASCADE')
              .onDelete('CASCADE');
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