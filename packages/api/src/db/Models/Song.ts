import { Model } from "./Model";
import type { Album } from "./Album";

export class Song extends Model {
  album_id: number;
  name: string;
  album: Album;

  static get tableName() {
    return "songs";
  }

  static get relationMappings() {
    const { Album } = require("./Album");

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
