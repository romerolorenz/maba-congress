
exports.up = function(knex) {
  return knex.schema.hasTable('committee').then(function(exists) {
    if (!exists) {
      knex.schema
          .createTable('committee', function(t) {
            t.string('committee').primary();
            t.text('jurisdiction');
            t.text('committeeOffice');
          })
          .then((result) => {
            console.log('committee table created');
          })
          .catch((error) => {
            console.log(error);
          });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('committee');
};