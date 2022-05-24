import { PartialModelGraph } from "objection";

import { setupTestApi } from "../../setupTestApi";
import { Album } from "../../db/index";

const { server, gql } = setupTestApi();

let album: Album;

beforeEach(async () => {
  album = await Album.query().insertGraphAndFetch({
    name: "yeezus",
    songs: [{ name: "test" }],
    genre: { name: "Rap" },
    artist: { name: "Kanye West" },
  } as PartialModelGraph<Album>);
});

describe("GET_ALBUM", () => {
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

  test("can get a single album", async () => {
    const response = await server.executeOperation({
      query: GET_ALBUM,
      variables: { id: album.id },
    });

    expect(response.data).toEqual({
      album: {
        id: expect.any(Number),
        name: "yeezus",
        artist: {
          id: expect.any(Number),
          name: "Kanye West",
        },
        genre: {
          id: expect.any(Number),
          name: "Rap",
        },
        songs: [
          {
            id: expect.any(Number),
            name: "test",
          },
        ],
      },
    });
  });

  test("can not get a single album if passing invalid params", async () => {
    expect(
      (
        await server.executeOperation({
          query: GET_ALBUM,
          variables: { id: "break" },
        })
      ).errors
    ).toBeTruthy();
  });
});

test("can get multiple albums", async () => {
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
        songs {
          id
          name
        }
      }
    }
  `;

  const response = await server.executeOperation({
    query: GET_ALBUMS,
  });

  expect(response.data).toEqual({
    albums: [
      {
        id: expect.any(Number),
        name: "yeezus",
        artist: {
          id: expect.any(Number),
          name: "Kanye West",
        },
        genre: {
          id: expect.any(Number),
          name: "Rap",
        },
        songs: [
          {
            id: expect.any(Number),
            name: "test",
          },
        ],
      },
    ],
  });
});

describe("CREATE_ALBUM", () => {
  const CREATE_ALBUM = gql`
    mutation CreateAlbum($name: String!, $artist_id: Int!, $genre_id: Int!) {
      createAlbum(name: $name, artist_id: $artist_id, genre_id: $genre_id) {
        id
      }
    }
  `;

  test("can create an album", async () => {
    await server.executeOperation({
      query: CREATE_ALBUM,
      variables: {
        name: "my new album",
        artist_id: album.artist.id,
        genre_id: album.genre.id,
      },
    });

    expect(
      await Album.query().where("name", "my new album").first()
    ).toBeTruthy();
  });

  test("can not create an album if passing invalid params", async () => {
    expect(
      (
        await server.executeOperation({
          query: CREATE_ALBUM,
          variables: {
            name: null,
            artist_id: album.artist.id,
            genre_id: album.genre.id,
          },
        })
      ).errors
    ).toBeTruthy();
  });
});

describe("UPDATE_ALBUM", () => {
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

  test("can update an album", async () => {
    await server.executeOperation({
      query: UPDATE_ALBUM,
      variables: {
        id: album.id,
        name: "my updated album",
        artist_id: album.artist.id,
        genre_id: album.genre.id,
      },
    });

    expect(
      await Album.query()
        .where("id", album.id)
        .where("name", "my updated album")
        .first()
    ).toBeTruthy();
  });

  test("can not update an album if passing invalid params", async () => {
    expect(
      (
        await server.executeOperation({
          query: UPDATE_ALBUM,
          variables: {
            id: "now-then",
            name: "my updated album",
            artist_id: album.artist.id,
            genre_id: album.genre.id,
          },
        })
      ).errors
    ).toBeTruthy();
  });
});

describe("DELETE_ALBUM", () => {
  const DELETE_ALBUM = gql`
    mutation DeleteAlbum($id: Int!) {
      deleteAlbum(id: $id)
    }
  `;

  test("can delete an album", async () => {
    await server.executeOperation({
      query: DELETE_ALBUM,
      variables: { id: album.id },
    });

    expect(await Album.query().where("id", album.id).first()).toBeFalsy();
  });

  test("can not delete an album if passing invalid params", async () => {
    expect(
      (
        await server.executeOperation({
          query: DELETE_ALBUM,
          variables: { id: "now-then" },
        })
      ).errors
    ).toBeTruthy();
  });
});
