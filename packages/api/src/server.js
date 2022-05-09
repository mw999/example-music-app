const { ApolloServer } = require("apollo-server");

const schema = require("./schema/schema");

const server = new ApolloServer({
  ...schema,
  csrfPrevention: true,
});

module.exports = server;
