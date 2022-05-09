import React from "react";
import { useMutation, gql } from "@apollo/client";

import { Button } from "../../../Components/index";

const DELETE_ALBUM = gql`
  mutation DeleteAlbum($id: Int!) {
    deleteAlbum(id: $id)
  }
`;

const DeleteAlbumButton = ({ album }) => {
  const [deleteAlbum] = useMutation(DELETE_ALBUM, {
    refetchQueries: ["GetAlbums"],
  });

  const handleDelete = () => {
    deleteAlbum({ variables: { id: album.id } });
  };

  return <Button onClick={handleDelete}>Delete</Button>;
};

export default DeleteAlbumButton;
