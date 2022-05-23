import { useReducer } from "react";

type Params =
  | { type: "UPDATE_NAME"; name: string }
  | { type: "UPDATE_ARTIST_ID"; artist_id: number }
  | { type: "UPDATE_GENRE_ID"; genre_id: number };

type State = {
  name: string;
  artist_id: number;
  genre_id: number;
};

const reducer = (state: State, params: Params): State => {
  switch (params.type) {
    case "UPDATE_NAME":
      return { ...state, name: params.name };
    case "UPDATE_ARTIST_ID":
      return { ...state, artist_id: params.artist_id };
    case "UPDATE_GENRE_ID":
      return { ...state, genre_id: params.genre_id };
    default:
      throw new Error();
  }
};

const useAlbumReducer = (initialAlbum: State) => {
  const [album, dispatch] = useReducer(reducer, initialAlbum);

  const valid = Boolean(album.name && album.artist_id && album.genre_id);

  return { album, valid, form: album, dispatch };
};

export default useAlbumReducer;
export { State, Params };
