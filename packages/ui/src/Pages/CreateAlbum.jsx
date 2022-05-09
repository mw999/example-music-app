import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

import { AlbumDetails, Slider, Flex, Heading2 } from "../Components/index";

const CREATE_ALBUM = gql`
  mutation CreateAlbum($name: String!, $artist_id: Int!, $genre_id: Int!) {
    createAlbum(name: $name, artist_id: $artist_id, genre_id: $genre_id) {
      id
    }
  }
`;

const CreateAlbum = () => {
  const navigate = useNavigate();

  const [createAlbum] = useMutation(CREATE_ALBUM, {
    refetchQueries: ["GetAlbums"],
    onCompleted: () => {
      navigate("/");
    },
  });

  const handleSubmit = (form) => {
    createAlbum({ variables: form });
  };

  return (
    <Slider>
      <Flex justify="between" style={{ marginBottom: "0.5rem" }}>
        <Heading2>Create album</Heading2>
        <Link to="/">Close</Link>
      </Flex>
      <AlbumDetails onSubmit={handleSubmit} />
    </Slider>
  );
};

export default CreateAlbum;
