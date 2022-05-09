import React from "react";
import { useQuery, gql } from "@apollo/client";

import { Select } from "./DesignSystem/index";

const GET_GENRES = gql`
  query GetGenres {
    genres {
      id
      name
    }
  }
`;

const GenreSelect = (props) => {
  const query = useQuery(GET_GENRES);

  return (
    <Select {...props}>
      {query.data && (
        <>
          <Select.Option value={""}></Select.Option>
          {query.data.genres.map((genre) => (
            <Select.Option key={genre.id} value={genre.id}>
              {genre.name}
            </Select.Option>
          ))}
        </>
      )}
    </Select>
  );
};

GenreSelect.GET_GENRES = GET_GENRES;

export default GenreSelect;
