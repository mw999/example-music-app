import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";

import { Flex, Heading1, Heading2, Span } from "../../Components/index";
import { DeleteAlbumButton } from "./Components/index";
import type { Album as AlbumType } from "../../Types/index";

const GET_ALBUMS = gql`
  query GetAlbums {
    albums {
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
    }
  }
`;

const Page = styled.div`
  padding: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  row-gap: 1rem;
  column-gap: 1rem;
`;

const Album = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px black;
  padding: 0.5rem;
`;

const Albums = () => {
  const query = useQuery(GET_ALBUMS);

  return (
    <>
      <Page>
        <Flex justify="space-between" style={{ marginBottom: "0.5rem" }}>
          <Heading1>Albums</Heading1>
          <div>
            <Link to="/create">Create album</Link>
          </div>
        </Flex>
        <Grid>
          {query.data &&
            query.data.albums.map((album: AlbumType) => (
              <Album key={album.id}>
                <Heading2>{album.name}</Heading2>
                <Span>{album.artist.name}</Span>
                <Span>{album.genre.name}</Span>
                <Flex justify="space-between">
                  <Link to={`/view/${album.id}`}>View</Link>
                  <Link to={`/update/${album.id}`}>Update</Link>
                  <DeleteAlbumButton album={album} />
                </Flex>
              </Album>
            ))}
        </Grid>
      </Page>
      <Outlet />
    </>
  );
};

export default Albums;
