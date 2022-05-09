const Model = require("./Model");

class Artist extends Model {
  static get tableName() {
    return "artists";
  }

  static get relationMappings() {
    const Album = require("./Album");

    return {
      albums: {
        relation: Model.HasManyRelation,
        modelClass: Album,
        join: {
          from: "artists.id",
          to: "albums.artist_id",
        },
      },
    };
  }
}

module.exports = Artist;
