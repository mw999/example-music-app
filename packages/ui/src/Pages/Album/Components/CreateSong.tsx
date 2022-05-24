import React from "react";
import { useMutation, gql } from "@apollo/client";

import SongDetails from "./SongDetails";
import type { Album } from "../../../Types/index";

const CREATE_SONG = gql`
  mutation CreateSong($name: String!, $album_id: Int!) {
    createSong(name: $name, album_id: $album_id) {
      id
    }
  }
`;

type Props = {
  album: Album;
};

const CreateSong = ({ album }: Props) => {
  const [createSong] = useMutation(CREATE_SONG, {
    refetchQueries: ["GetAlbum"],
  });

  const handleSubmit = (form: { name: string }) => {
    createSong({ variables: { album_id: album.id, ...form } });
  };

  return <SongDetails initialName="" onSubmit={handleSubmit} />;
};

export default CreateSong;
