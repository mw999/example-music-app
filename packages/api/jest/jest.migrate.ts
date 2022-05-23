import Knex from "knex";

require("dotenv").config({ path: "./.env" });

import knexfile from "../src/db/knexfile";

const migrateDatabase = async () => {
  const knex = Knex(knexfile);
  await knex.migrate.latest();
  return knex.destroy();
};

(async () => {
  await migrateDatabase();
})();