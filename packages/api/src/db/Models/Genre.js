const Model = require("./Model");

class Genre extends Model {
  static get tableName() {
    return "genres";
  }

  static get relationMappings() {
    const Album = require("./Album");

    return {
      albums: {
        relation: Model.HasManyRelation,
        modelClass: Album,
        join: {
          from: "genres.id",
          to: "albums.genre_id",
        },
      },
    };
  }
}

module.exports = Genre;
