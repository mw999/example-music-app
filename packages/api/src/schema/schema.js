const { gql } = require("apollo-server-express");

const types = require("./types/index");

const defaultTypeDefs = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
  type Subscription {
    root: String
  }
`;

// Merge all of our types together, forming the schema.
const { typeDefs, resolvers } = Object.values(types).reduce(
  (allTypes, { typeDefs, resolvers }) => {
    allTypes.typeDefs = allTypes.typeDefs.concat(typeDefs);

    if (resolvers) {
      allTypes.resolvers = allTypes.resolvers.concat(resolvers);
    }

    return allTypes;
  },
  {
    typeDefs: [defaultTypeDefs],
    resolvers: [],
  }
);

const schema = {
  typeDefs,
  resolvers,
};

module.exports = schema;
