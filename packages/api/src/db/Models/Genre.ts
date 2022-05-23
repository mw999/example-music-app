import { Model } from "./Model";
import type { Album } from "./Album";

export class Genre extends Model {
  name: string;
  albums: Album[];

  static get tableName() {
    return "genres";
  }

  static get relationMappings() {
    const { Album } = require("./Album");

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
