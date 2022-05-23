import { Song, Album } from "../../db/index";
import type { QueryBuilder } from "objection";

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

// TODO: This would be implemented when wiring up auth and making use of context.
type context = any;

const resolvers = {
  Song: {
    album: (song: Song): QueryBuilder<Album, Album> => {
      return song.$relatedQuery("album");
    },
  },

  Query: {
    songs: (): QueryBuilder<Song, Song[]> => Song.query(),
  },

  Mutation: {
    createSong: async (
      context: context,
      params: { album_id: number; name: string }
    ): QueryBuilder<Song, Song> => {
      const album = await Album.query()
        .findById(params.album_id)
        .throwIfNotFound();

      return Song.query().insert({
        name: params.name,
        album_id: album.id,
      });
    },
    updateSong: async (
      context: context,
      params: { id: number; name: string }
    ): QueryBuilder<Song, Song> => {
      const song = await Song.query().findById(params.id).throwIfNotFound();

      return song.$query().updateAndFetch({
        name: params.name,
      });
    },
    deleteSongs: async (
      context: context,
      params: { ids: number[] }
    ): Promise<number[]> => {
      const songs = await Song.query().findByIds(params.ids).throwIfNotFound();

      for (const song of songs) {
        await song.$query().delete();
      }

      return params.ids;
    },
  },
};

const song = { typeDefs, resolvers };

export default song;
