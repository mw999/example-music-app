import Artist from "./Artist";
import Genre from "./Genre";

type Album = {
  id: number;
  name: string;
  artist: Artist;
  genre: Genre;
};

export default Album;
