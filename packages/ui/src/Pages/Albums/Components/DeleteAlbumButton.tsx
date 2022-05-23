import React from "react";
import { useMutation, gql } from "@apollo/client";

import { Button } from "../../../Components/index";
import type { Album } from "../../../Types/index";

const DELETE_ALBUM = gql`
  mutation DeleteAlbum($id: Int!) {
    deleteAlbum(id: $id)
  }
`;

type Props = {
  album: Album;
};

const DeleteAlbumButton = ({ album }: Props) => {
  const [deleteAlbum] = useMutation(DELETE_ALBUM, {
    refetchQueries: ["GetAlbums"],
  });

  const handleDelete = () => {
    deleteAlbum({ variables: { id: album.id } });
  };

  return <Button onClick={handleDelete}>Delete</Button>;
};

export default DeleteAlbumButton;
