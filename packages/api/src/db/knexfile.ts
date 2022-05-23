import type { Knex } from "knex";

require("dotenv").config({ path: "../../.env" });

const standard: Knex.StaticConnectionConfig = {
  timezone: "+00:00",
  charset: "utf8mb4",
  port: 3306,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const testing: Knex.StaticConnectionConfig = {
  timezone: "+00:00",
  charset: "utf8mb4",
  port: parseInt(process.env.TEST_DATABASE_PORT),
  host: process.env.TEST_DATABASE_HOST,
  user: process.env.TEST_DATABASE_USER,
  password: process.env.TEST_DATABASE_PASSWORD,
  database: process.env.TEST_DATABASE_NAME || "test_database",
};

const knexfile: Knex.Config = {
  client: "mysql2",
  migrations: {
    directory: `${__dirname}/migrations`,
  },
  seeds: {
    directory: `${__dirname}/seeds`,
  },
  connection: process.env.NODE_ENV === "test" ? testing : standard,
};

export default knexfile;