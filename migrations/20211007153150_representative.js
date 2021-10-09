
exports.up = async function(knex) {
    if (!(await knex.schema.hasTable('representative'))) {
      await knex.schema
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
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('representative');
};