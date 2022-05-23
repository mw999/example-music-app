import { Model } from "./Model";
import type { Album } from "./Album";

export class Artist extends Model {
  name: string;
  albums: Album[];

  static get tableName() {
    return "artists";
  }

  static get relationMappings() {
    const { Album } = require("./Album");

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
