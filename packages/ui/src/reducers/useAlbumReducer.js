import { useReducer } from "react";

const TYPES = {
  UPDATE_NAME: "UPDATE_NAME",
  UPDATE_ARTIST_ID: "UPDATE_ARTIST_ID",
  UPDATE_GENRE_ID: "UPDATE_GENRE_ID",
};

const reducer = (state, { type, ...params }) => {
  switch (type) {
    case TYPES.UPDATE_NAME:
      return { ...state, name: params.name };
    case TYPES.UPDATE_ARTIST_ID:
      return { ...state, artist_id: params.artist_id };
    case TYPES.UPDATE_GENRE_ID:
      return { ...state, genre_id: params.genre_id };
    default:
      throw new Error();
  }
};

const defaultAlbum = {
  name: "",
  artist_id: "",
  genre_id: "",
};

const useAlbumReducer = (initialAlbum = defaultAlbum) => {
  const [album, dispatch] = useReducer(reducer, initialAlbum);

  const valid = Boolean(album.name && album.artist_id && album.genre_id);

  return { album, valid, form: album, dispatch, TYPES };
};

export default useAlbumReducer;
