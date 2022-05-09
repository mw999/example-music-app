const { Genre } = require("../../db/index");

const typeDefs = `
  type Genre {
    id: Int
    name: String
    albums: [Album]
  }

  extend type Query {
    genres: [Genre]
  }
`;

const resolvers = {
  Genre: {
    albums: (genre) => genre.$relatedQuery("albums"),
  },

  Query: {
    genres: () => Genre.query(),
  },
};

module.exports = { typeDefs, resolvers };
