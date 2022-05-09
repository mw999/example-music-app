const { Artist } = require("../../db/index");

const typeDefs = `
  type Artist {
    id: Int
    name: String
    albums: [Album]
  }

  extend type Query {
    artists: [Artist]
  }
`;

const resolvers = {
  Artist: {
    albums: (artist) => artist.$relatedQuery("albums"),
  },

  Query: {
    artists: () => Artist.query(),
  },
};

module.exports = { typeDefs, resolvers };
