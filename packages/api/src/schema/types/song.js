const { Song, Album } = require("../../db/index");

const typeDefs = `
  type Song {
    id: Int
    name: String
    album: Album
  }

  extend type Query {
    songs: [Song]
  }


  extend type Mutation {
    createSong(name: String!, album_id: Int!): Song!
    updateSong(id: Int!, name: String!): Song!
    deleteSongs(ids: [Int!]!): [Int!]!
  }
`;

const resolvers = {
  Song: {
    album: (song) => song.$relatedQuery("album"),
  },

  Query: {
    songs: () => Song.query(),
  },

  Mutation: {
    createSong: async (_, params) => {
      const album = await Album.query()
        .findById(params.album_id)
        .throwIfNotFound();

      return Song.query().insert({
        name: params.name,
        album_id: album.id,
      });
    },
    updateSong: async (_, params) => {
      const song = await Song.query().findById(params.id).throwIfNotFound();

      return song.$query().updateAndFetch({
        name: params.name,
      });
    },
    deleteSongs: async (_, params) => {
      const songs = await Song.query().findByIds(params.ids).throwIfNotFound();

      for (const song of songs) {
        await song.$query().delete();
      }

      return params.ids;
    },
  },
};

module.exports = { typeDefs, resolvers };
