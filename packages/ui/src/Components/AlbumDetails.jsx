import React from "react";

import { Flex, Input, Label, Button } from "./DesignSystem/index";
import GenreSelect from "./GenreSelect";
import ArtistSelect from "./ArtistSelect";
import { useAlbumReducer } from "../reducers/index";

const AlbumDetails = ({ initialAlbum, onSubmit }) => {
  const album = useAlbumReducer(initialAlbum);

  const handleNameChange = (event) => {
    const name = event.target.value;

    album.dispatch({ type: album.TYPES.UPDATE_NAME, name });
  };

  const handleArtistChange = (event) => {
    const artistId = event.target.value;

    album.dispatch({
      type: album.TYPES.UPDATE_ARTIST_ID,
      artist_id: artistId ? parseInt(artistId) : null,
    });
  };

  const handleGenreChange = (event) => {
    const genreId = event.target.value;

    album.dispatch({
      type: album.TYPES.UPDATE_GENRE_ID,
      genre_id: genreId ? parseInt(genreId) : null,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!album.valid) {
      return;
    }

    onSubmit(album.form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" ySpaceSm>
        <Flex direction="column">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={album.album.name}
            onChange={handleNameChange}
          />
        </Flex>
        <Flex direction="column">
          <Label htmlFor="artist">Artist</Label>
          <ArtistSelect
            id="artist"
            value={album.album.artist_id}
            onChange={handleArtistChange}
          />
        </Flex>
        <Flex direction="column">
          <Label htmlFor="genre">Genre</Label>
          <GenreSelect
            id="genre"
            value={album.album.genre_id}
            onChange={handleGenreChange}
          />
        </Flex>
        <Button type="submit" disabled={!album.valid}>
          Save
        </Button>
      </Flex>
    </form>
  );
};

export default AlbumDetails;
