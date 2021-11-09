
exports.up = async function(knex) {
    if (!(await knex.schema.hasTable('attendance'))) {
      await knex.schema
          .createTable('attendance', function(t) {
            t.integer('representativeId').unsigned();
            t.foreign('representativeId').references('representative.id')
              .onUpdate('CASCADE')
              .onDelete('CASCADE');
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
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('bill');
};