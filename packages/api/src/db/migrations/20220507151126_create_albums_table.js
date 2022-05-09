exports.up = (knex) => {
  return knex.schema.createTable("albums", (table) => {
    table.increments("id");
    table.integer("artist_id").unsigned().index();
    table.integer("genre_id").unsigned().index();
    table.string("name", 128);
    table.timestamps();

    table
      .foreign("artist_id")
      .references("id")
      .inTable("artists")
      .onDelete("cascade");
    table
      .foreign("genre_id")
      .references("id")
      .inTable("genres")
      .onDelete("cascade");
  });
};

exports.down = () => {
  //
};
