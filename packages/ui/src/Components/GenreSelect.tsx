import React from "react";
import { useQuery, gql } from "@apollo/client";

import { Select, Option } from "./DesignSystem/index";
import { Genre, Select as SelectType } from "../Types/idnex";

const GET_GENRES = gql`
  query GetGenres {
    genres {
      id
      name
    }
  }
`;

const GenreSelect = (props: SelectType) => {
  const query = useQuery(GET_GENRES);

  return (
    <Select id={props.id} value={props.value || ""} onChange={props.onChange}>
      {query.data && (
        <>
          <Option value={""}></Option>
          {query.data.genres.map((genre: Genre) => (
            <Option key={genre.id} value={genre.id}>
              {genre.name}
            </Option>
          ))}
        </>
      )}
    </Select>
  );
};

GenreSelect.GET_GENRES = GET_GENRES;

export default GenreSelect;
