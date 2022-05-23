import type { Knex } from "knex";

exports.up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable("artists", (table) => {
    table.increments("id");
    table.string("name", 128);
    table.timestamps();
  });
};

exports.down = (): void => {
  //
};
