import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import { Label, Flex, Button } from "../../../Components/index";
import SongDetails from "./SongDetails";

const UPDATE_SONG = gql`
  mutation UpdateSong($id: Int!, $name: String!) {
    updateSong(id: $id, name: $name) {
      id
    }
  }
`;

const CreateSong = ({ song }) => {
  const [editing, setEditing] = useState(false);

  const [updateSong] = useMutation(UPDATE_SONG, {
    refetchQueries: ["GetAlbum"],
    onCompleted: () => {
      setEditing(false);
    },
  });

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleStopEditing = () => {
    setEditing(false);
  };

  const handleSubmit = (form) => {
    updateSong({ variables: { id: song.id, ...form } });
  };

  if (editing) {
    return (
      <Flex style={{ width: "100%" }}>
        <SongDetails initialName={song.name} onSubmit={handleSubmit} />
        <Flex style={{ marginLeft: "0.5rem" }}>
          <Button onClick={handleStopEditing}>Cancel</Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex justify="between" style={{ width: "100%" }}>
      <Label htmlFor={song.id} style={{ marginBottom: 0 }}>
        {song.name}
      </Label>
      <Button onClick={handleStartEditing}>Edit</Button>
    </Flex>
  );
};

export default CreateSong;
