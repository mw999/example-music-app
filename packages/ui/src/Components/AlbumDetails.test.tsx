import React from "react";
import { test, vi, expect } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { render, fireEvent } from "@testing-library/react";

import AlbumDetails from "./AlbumDetails";
import ArtistSelect from "./ArtistSelect";
import GenreSelect from "./GenreSelect";

const onSubmit = vi.fn();

const mocks = [
  {
    request: { query: GenreSelect.GET_GENRES },
    result: { data: { genres: [{ id: 21, name: "Rap" }] } },
  },
  {
    request: { query: ArtistSelect.GET_ARTISTS },
    result: { data: { artists: [{ id: 83, name: "Kanye West" }] } },
  },
];

test("can submit album details", async () => {
  const getters = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AlbumDetails
        onSubmit={onSubmit}
        initialAlbum={{ name: "", genre_id: null, artist_id: null }}
      />
    </MockedProvider>
  );

  expect(await getters.findByText("Rap")).toBeInTheDocument();
  expect(await getters.findByText("Kanye West")).toBeInTheDocument();

  fireEvent.change(getters.getByLabelText("Name"), {
    target: { value: "my beautiful dark twisted fantasy" },
  });
  fireEvent.change(getters.getByLabelText("Genre"), {
    target: { value: 21 },
  });
  fireEvent.change(getters.getByLabelText("Artist"), {
    target: { value: 83 },
  });

  fireEvent.click(getters.getByText("Save"));

  expect(onSubmit).toHaveBeenCalledWith({
    name: "my beautiful dark twisted fantasy",
    artist_id: 83,
    genre_id: 21,
  });
});

test("can not submit album details if all fields are not given", () => {
  const getters = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AlbumDetails
        onSubmit={onSubmit}
        initialAlbum={{ name: "", genre_id: null, artist_id: null }}
      />
    </MockedProvider>
  );
  fireEvent.click(getters.getByText("Save"));

  expect(onSubmit).not.toHaveBeenCalled();
});
