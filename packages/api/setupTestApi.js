const { ApolloServer, gql } = require("apollo-server-express");
const Knex = require("knex");
const { transaction, Model } = require("objection");

const knexfile = require("./src/db/knexfile");
const schema = require("./src/schema/index");

const useDatabaseTransactions = () => {
  let trx;
  let knex;

  beforeEach(async () => {
    knex = Knex(knexfile);
    trx = await transaction.start(knex);
    Model.knex(trx);
  });

  afterEach(async () => {
    await trx.rollback();
    await knex.destroy();
  });

  return [knex, trx];
};

const setupTestApi = () => {
  useDatabaseTransactions();

  const server = new ApolloServer(schema);

  return {
    server,
    gql,
  };
};

module.exports = { setupTestApi, useDatabaseTransactions };
