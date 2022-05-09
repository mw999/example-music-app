import React from "react";
import { useQuery, gql } from "@apollo/client";

import { Select } from "./DesignSystem/index";

const GET_ARTISTS = gql`
  query GetArtists {
    artists {
      id
      name
    }
  }
`;

const ArtistSelect = (props) => {
  const query = useQuery(GET_ARTISTS);

  return (
    <Select {...props}>
      {query.data && (
        <>
          <Select.Option value={""}></Select.Option>
          {query.data.artists.map((artist) => (
            <Select.Option key={artist.id} value={artist.id}>
              {artist.name}
            </Select.Option>
          ))}
        </>
      )}
    </Select>
  );
};

ArtistSelect.GET_ARTISTS = GET_ARTISTS;

export default ArtistSelect;
