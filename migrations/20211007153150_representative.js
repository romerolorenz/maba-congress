
exports.up = function(knex) {
  return knex.schema.hasTable('representative').then(function(exists) {
    if (!exists) {
      knex.schema
          .createTable('representative', function(t) {
            t.increments('id').primary();
            t.string('lastName');
            t.string('firstName');
            t.string('district');
            t.string('region');
          })
          .then((result) => {
            console.log('representative table created');
          })
          .catch((error) => {
            console.log(error);
          });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('representative');
};