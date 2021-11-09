
exports.up = async function(knex) {
    if (!(await knex.schema.hasTable('asset'))) {
      await knex.schema
          .createTable('asset', function(t) {
            t.decimal('totalAssets', 30, 2);
            t.decimal('totalLiabilities', 30, 2);
            t.date('date');
            t.integer('representativeId').unsigned();
            t.foreign('representativeId').references('representative.id')
              .onUpdate('CASCADE')
              .onDelete('CASCADE');
            t.primary(['representativeId', 'date'])
          })
          .then((result) => {
            console.log('asset table created');
          })
          .catch((error) => {
            console.log(error);
          });
    }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('asset');
};