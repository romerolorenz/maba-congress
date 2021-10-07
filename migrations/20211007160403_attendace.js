
exports.up = function(knex) {
  return knex.schema.hasTable('attendance').then(function(exists) {
    if (!exists) {
      knex.schema
          .createTable('attendance', function(t) {
            t.integer('representativeId').unsigned();
            t.foreign('representativeId').references('representative.id');
            t.integer('absenceWithoutNotice');
            t.integer('absenceWithNotice');
            t.integer('deemedPresent');
            t.integer('actuallyPresent');
            t.string('session');
            t.primary(['representativeId', 'session']);
          })
          .then((result) => {
            console.log('attendance table created');
          })
          .catch((error) => {
            console.log(error);
          });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('bill');
};