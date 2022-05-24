import React from "react";
import { useQuery, gql } from "@apollo/client";

import { Select, Option } from "./DesignSystem/index";
import type { Artist, Select as SelectType } from "../Types/index";

const GET_ARTISTS = gql`
  query GetArtists {
    artists {
      id
      name
    }
  }
`;

const ArtistSelect = (props: SelectType) => {
  const query = useQuery(GET_ARTISTS);

  return (
    <Select id={props.id} value={props.value || ""} onChange={props.onChange}>
      {query.data && (
        <>
          <Option value={""}></Option>
          {query.data.artists.map((artist: Artist) => (
            <Option key={artist.id} value={artist.id}>
              {artist.name}
            </Option>
          ))}
        </>
      )}
    </Select>
  );
};

ArtistSelect.GET_ARTISTS = GET_ARTISTS;

export default ArtistSelect;
