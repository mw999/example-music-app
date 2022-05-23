import type { Knex } from "knex";

exports.up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable("songs", (table) => {
    table.increments("id");
    table.integer("album_id").unsigned().index();
    table.string("name", 128);
    table.timestamps();

    table
      .foreign("album_id")
      .references("id")
      .inTable("albums")
      .onDelete("cascade");
  });
};

exports.down = (): void => {
  //
};
