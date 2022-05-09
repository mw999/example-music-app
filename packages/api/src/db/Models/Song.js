const Model = require("./Model");

class Song extends Model {
  static get tableName() {
    return "songs";
  }

  static get relationMappings() {
    const Album = require("./Album");

    return {
      album: {
        relation: Model.BelongsToOneRelation,
        modelClass: Album,
        join: {
          from: "songs.album_id",
          to: "albums.id",
        },
      },
    };
  }
}

module.exports = Song;
