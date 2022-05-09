const { Model } = require("objection");
const Knex = require("knex");

require("dotenv").config();

const server = require("./server");
const { knexfile } = require("./db/index");

const knex = Knex(knexfile);
Model.knex(knex);

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
