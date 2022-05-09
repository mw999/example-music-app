import { Album, Artist, Genre, Song } from "../../db/index";
import type { QueryBuilder } from "objection";

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

// TODO: This would be implemented when wiring up auth and making use of context.
type context = any;

const resolvers = {
  Album: {
    artist: (album: Album): QueryBuilder<Artist, Artist> => {
      return album.$relatedQuery("artist");
    },
    genre: (album: Album): QueryBuilder<Genre, Genre> => {
      return album.$relatedQuery("genre");
    },
    songs: (album: Album): QueryBuilder<Song, Song[]> => {
      return album.$relatedQuery("songs");
    },
  },

  Query: {
    album: (
      context: context,
      params: { id: number }
    ): QueryBuilder<Album, Album> => {
      console.log(thisVariableDoesNotExist);
      
      return Album.query().findById(params.id).throwIfNotFound();
    },
    albums: (): QueryBuilder<Album, Album[]> => {
      return Album.query().orderBy("created_at", "DESC");
    },
  },

  Mutation: {
    createAlbum: async (
      context: context,
      params: { genre_id: number; artist_id: number; name: string }
    ): Promise<QueryBuilder<Album, Album>> => {
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
    updateAlbum: async (
      context: context,
      params: { id: number; genre_id: number; artist_id: number; name: string }
    ): Promise<QueryBuilder<Album, Album>> => {
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
    deleteAlbum: async (
      context: context,
      params: { id: number }
    ): Promise<number> => {
      const album = await Album.query().findById(params.id).throwIfNotFound();

      await album.$query().delete();

      return params.id;
    },
  },
};

const album = { typeDefs, resolvers };

export default album;
