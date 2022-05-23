import { ApolloServer, gql } from "apollo-server-express";
import Knex from "knex";
import { transaction, Model } from "objection";
import type { Knex as KnexType } from "knex";
import type { Transaction } from "objection";

import knexfile from "./db/knexfile";
import schema from "./schema/index";

const useDatabaseTransactions = (): [KnexType, Transaction] => {
  let trx: Transaction;
  let knex: KnexType;

  beforeEach(
    async (): Promise<void> => {
      knex = Knex(knexfile);
      trx = await transaction.start(knex);
      Model.knex(trx);
    }
  );

  afterEach(
    async (): Promise<void> => {
      await trx.rollback();
      await knex.destroy();
    }
  );

  return [knex, trx];
};

const setupTestApi = (): { server: ApolloServer; gql: typeof gql } => {
  useDatabaseTransactions();

  const server = new ApolloServer(schema);

  return {
    server,
    gql,
  };
};

export { setupTestApi, useDatabaseTransactions };
