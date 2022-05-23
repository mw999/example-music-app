import { Genre, Album } from "../../db/index";
import type { QueryBuilder } from "objection";

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
    albums: (genre: Genre): QueryBuilder<Album, Album[]> => {
      return genre.$relatedQuery("albums");
    },
  },

  Query: {
    genres: (): QueryBuilder<Genre, Genre[]> => Genre.query(),
  },
};

const genre = { typeDefs, resolvers };

export default genre;
