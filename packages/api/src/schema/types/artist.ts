import { Artist, Album } from "../../db/index";
import type { QueryBuilder } from "objection";

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
    albums: (artist: Artist): QueryBuilder<Album, Album[]> => {
      return artist.$relatedQuery("albums");
    },
  },

  Query: {
    artists: (): QueryBuilder<Artist> => Artist.query(),
  },
};

const artist = { typeDefs, resolvers };

export default artist;
