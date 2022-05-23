import { Model } from "objection";
import Knex from "knex";
import * as dotenv from "dotenv";
import type { ServerInfo } from "apollo-server";

dotenv.config();

import server from "./server";
import { knexfile } from "./db/index";

const knex = Knex(knexfile);
Model.knex(knex);

server.listen().then(({ url }: ServerInfo): void => {
  console.log(`Server ready at ${url}`);
});
