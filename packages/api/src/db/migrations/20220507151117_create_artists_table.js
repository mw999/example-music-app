exports.up = (knex) => {
  return knex.schema.createTable("artists", (table) => {
    table.increments("id");
    table.string("name", 128);
    table.timestamps();
  });
};

exports.down = () => {
  //
};
