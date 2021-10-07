
exports.up = function(knex) {
  return knex.schema.hasTable('asset').then(function(exists) {
    if (!exists) {
      knex.schema
          .createTable('asset', function(t) {
            t.decimal('totalAssets', 30, 2);
            t.decimal('totalLiabilities', 30, 2);
            t.date('date');
            t.integer('representativeId').unsigned();
            t.foreign('representativeId').references('representative.id');
            t.primary(['representativeId', 'date'])
          })
          .then((result) => {
            console.log('asset table created');
          })
          .catch((error) => {
            console.log(error);
          });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('asset');
};