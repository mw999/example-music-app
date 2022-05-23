import type { Knex } from "knex";

require("dotenv").config({ path: "../../.env" });

const connection: Knex.StaticConnectionConfig = {
  timezone: "+00:00",
  charset: "utf8mb4",
  port: 3306,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const knexfile: Knex.Config = {
  client: "mysql2",
  migrations: {
    directory: `${__dirname}/migrations`,
  },
  seeds: {
    directory: `${__dirname}/seeds`,
  },
  connection
};

export default knexfile;
