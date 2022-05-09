const Knex = require("knex");

require("dotenv").config();

const knexfile = require("../src/db/knexfile");

const migrateDatabase = async () => {
  const knex = Knex(knexfile);
  await knex.migrate.latest();
  return knex.destroy();
};

(async () => {
  await migrateDatabase();
})();
