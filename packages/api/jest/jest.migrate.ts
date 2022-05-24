import Knex from "knex";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import knexfile from "../src/db/knexfile";

const migrateDatabase = async () => {
  const knex = Knex(knexfile);
  await knex.migrate.latest();
  return knex.destroy();
};

(async () => {
  await migrateDatabase();
})();