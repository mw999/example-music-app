import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import SongDetails from "./SongDetails";

const CREATE_SONG = gql`
  mutation CreateSong($name: String!, $album_id: Int!) {
    createSong(name: $name, album_id: $album_id) {
      id
    }
  }
`;

const CreateSong = ({ album }) => {
  const [createSong] = useMutation(CREATE_SONG, {
    refetchQueries: ["GetAlbum"],
  });

  const handleSubmit = (form) => {
    createSong({ variables: { album_id: album.id, ...form } });
  };

  return <SongDetails onSubmit={handleSubmit} />;
};

export default CreateSong;
