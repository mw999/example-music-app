const Knex = require("knex");

require("dotenv").config();

const knexfile = require("../src/db/knexfile");

const migrateDatabase = async () => {
  const knex = Knex({
    timezone: "+00:00",
    charset: "utf8mb4",
    port: parseInt(process.env.TEST_DATABASE_PORT),
    host: process.env.TEST_DATABASE_HOST,
    user: process.env.TEST_DATABASE_USER,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_NAME || "test_database",
  });
  await knex.migrate.latest();
  return knex.destroy();
};

(async () => {
  await migrateDatabase();
})();
