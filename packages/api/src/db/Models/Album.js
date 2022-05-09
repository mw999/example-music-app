const Model = require("./Model");

class Album extends Model {
  static get tableName() {
    return "albums";
  }

  static get relationMappings() {
    const Genre = require("./Genre");
    const Artist = require("./Artist");
    const Song = require("./Song");

    return {
      artist: {
        relation: Model.BelongsToOneRelation,
        modelClass: Artist,
        join: {
          from: "albums.artist_id",
          to: "artists.id",
        },
      },
      genre: {
        relation: Model.BelongsToOneRelation,
        modelClass: Genre,
        join: {
          from: "albums.genre_id",
          to: "genres.id",
        },
      },
      songs: {
        relation: Model.HasManyRelation,
        modelClass: Song,
        join: {
          from: "albums.id",
          to: "songs.album_id",
        },
      },
    };
  }
}

module.exports = Album;
