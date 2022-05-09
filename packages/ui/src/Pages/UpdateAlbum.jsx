import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, gql } from "@apollo/client";

import { AlbumDetails, Slider, Flex, Heading2 } from "../Components/index";
import Album from "./Album/index";

const UPDATE_ALBUM = gql`
  mutation UpdateAlbum(
    $id: Int!
    $name: String!
    $artist_id: Int!
    $genre_id: Int!
  ) {
    updateAlbum(
      id: $id
      name: $name
      artist_id: $artist_id
      genre_id: $genre_id
    ) {
      id
    }
  }
`;

const UpdateAlbum = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const query = useQuery(Album.GET_ALBUM, {
    variables: { id: parseInt(id) },
  });
  const [updateAlbum] = useMutation(UPDATE_ALBUM, {
    refetchQueries: ["GetAlbums", "GetAlbum"],
    onCompleted: () => {
      navigate("/");
    },
  });

  const handleSubmit = (form) => {
    updateAlbum({ variables: { id: query.data.album.id, ...form } });
  };

  return (
    <Slider>
      <Flex justify="between" style={{ marginBottom: "0.5rem" }}>
        <Heading2>Update album</Heading2>
        <Link to="/">Close</Link>
      </Flex>
      {query.data && (
        <AlbumDetails
          onSubmit={handleSubmit}
          initialAlbum={{
            name: query.data.album.name,
            artist_id: query.data.album.artist.id,
            genre_id: query.data.album.genre.id,
          }}
        />
      )}
    </Slider>
  );
};

export default UpdateAlbum;
