const { Album, Artist, Genre } = require("../../db/index");

const typeDefs = `
  type Album {
    id: Int
    name: String
    artist: Artist
    genre: Genre
    songs: [Song]
  }

  extend type Query {
    album(id: Int!): Album!
    albums: [Album]
  }

  extend type Mutation {
    createAlbum(name: String!, artist_id: Int!, genre_id: Int!): Album!
    updateAlbum(id: Int!, name: String!, artist_id: Int!, genre_id: Int!): Album!
    deleteAlbum(id: Int!): Int!
  }
`;

const resolvers = {
  Album: {
    artist: (album) => album.$relatedQuery("artist"),
    genre: (album) => album.$relatedQuery("genre"),
    songs: (album) => album.$relatedQuery("songs"),
  },

  Query: {
    album: (_, params) => {
      // This is a change that doesn't break ci.
      return Album.query().findById(params.id).throwIfNotFound();
    },
    albums: () => Album.query().orderBy("created_at", "DESC"),
  },

  Mutation: {
    createAlbum: async (_, params) => {
      const genre = await Genre.query()
        .findById(params.genre_id)
        .throwIfNotFound();
      const artist = await Artist.query()
        .findById(params.artist_id)
        .throwIfNotFound();

      return Album.query().insert({
        name: params.name,
        artist_id: artist.id,
        genre_id: genre.id,
      });
    },
    updateAlbum: async (_, params) => {
      const album = await Album.query().findById(params.id).throwIfNotFound();
      const genre = await Genre.query()
        .findById(params.genre_id)
        .throwIfNotFound();
      const artist = await Artist.query()
        .findById(params.artist_id)
        .throwIfNotFound();

      return album.$query().updateAndFetch({
        name: params.name,
        artist_id: artist.id,
        genre_id: genre.id,
      });
    },
    deleteAlbum: async (_, params) => {
      const album = await Album.query().findById(params.id).throwIfNotFound();

      await album.$query().delete();

      return params.id;
    },
  },
};

module.exports = { typeDefs, resolvers };
