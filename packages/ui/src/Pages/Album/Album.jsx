import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

import {
  Slider,
  Flex,
  Span,
  Heading2,
  Checkbox,
  Button,
} from "../../Components/index";
import { UpdateSong, CreateSong } from "./Components/index";

const GET_ALBUM = gql`
  query GetAlbum($id: Int!) {
    album(id: $id) {
      id
      name
      artist {
        id
        name
      }
      genre {
        id
        name
      }
      songs {
        id
        name
      }
    }
  }
`;

const DELETE_SONGS = gql`
  mutation DeleteSongs($ids: [Int!]!) {
    deleteSongs(ids: $ids)
  }
`;

const Album = () => {
  const [selected, setSelected] = useState([]);

  const { id } = useParams();
  const query = useQuery(GET_ALBUM, {
    variables: { id: parseInt(id) },
  });
  const [deleteSongs] = useMutation(DELETE_SONGS, {
    refetchQueries: ["GetAlbum"],
    onCompleted: () => {
      setSelected([]);
    },
  });

  const handleCheckboxClick = (song) => {
    if (selected.includes(song.id)) {
      setSelected((selected) => selected.filter((id) => id !== song.id));
    } else {
      setSelected((selected) => selected.concat(song.id));
    }
  };

  const handleDeleteAll = () => {
    deleteSongs({ variables: { ids: selected } });
  };

  const handleClear = () => {
    setSelected([]);
  };

  return (
    <Slider>
      {query.data && (
        <Flex direction="column" style={{ height: "100%" }}>
          <Flex direction="column" style={{ height: "100%" }}>
            <Flex justify="between" style={{ marginBottom: "0.5rem" }}>
              <Heading2>{query.data.album.name}</Heading2>
              <Link to="/">Close</Link>
            </Flex>
            <Flex style={{ marginBottom: "0.5rem" }}>
              <Heading2>Songs</Heading2>
            </Flex>
            <Flex direction="column" ySpaceSm>
              {query.data.album.songs.map((song) => (
                <Flex key={song.id}>
                  <Checkbox
                    id={song.id}
                    checked={selected.includes(song.id)}
                    onChange={() => handleCheckboxClick(song)}
                  />
                  <UpdateSong song={song} />
                </Flex>
              ))}
              <CreateSong album={query.data.album} />
            </Flex>
          </Flex>
          {selected.length > 0 && (
            <Flex justify="between">
              <Span>Selected {selected.length} song(s)</Span>
              <Flex xSpaceSm>
                <Button onClick={handleDeleteAll}>Delete all</Button>
                <Button onClick={handleClear}>Clear</Button>
              </Flex>
            </Flex>
          )}
        </Flex>
      )}
    </Slider>
  );
};

Album.GET_ALBUM = GET_ALBUM;
export default Album;
