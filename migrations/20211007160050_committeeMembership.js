
exports.up = async function(knex) {
    if (!(await knex.schema.hasTable('committeeMembership'))) {
      await knex.schema
          .createTable('committeeMembership', function(t) {
            t.integer('representativeId').unsigned();
            t.foreign('representativeId').references('representative.id');
            t.string('committee');
            t.foreign('committee').references('committee.committee');
            t.string('role');
            t.date('date');
            t.primary(['representativeId', 'committee']);
          })
          .then((result) => {
            console.log('committeeMembership table created');
          })
          .catch((error) => {
            console.log(error);
          });
    }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('committeeMembership');
};