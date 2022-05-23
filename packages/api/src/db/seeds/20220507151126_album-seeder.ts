import faker from "faker";
import type { Knex } from "knex";

type Genre = {
  id: number;
};

// https://stackoverflow.com/a/7228322
const getRandomNumberInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// https://stackoverflow.com/a/5915122
const getRandomItemFromArray = (array: any[]): any => {
  return array[Math.floor(Math.random() * array.length)];
};

exports.seed = async (knex: Knex): Promise<void> => {
  const genres = await knex<Genre>("genres");

  for (let i = 0; i <= 20; i++) {
    const artistId = await knex("artists").insert({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      created_at: faker.date.past(),
      updated_at: faker.date.past(),
    });

    const albumCount = getRandomNumberInRange(1, 3);

    for (let i = 0; i <= albumCount; i++) {
      const genre = getRandomItemFromArray(genres);

      const albumId = await knex("albums").insert({
        artist_id: artistId,
        genre_id: genre.id,
        name: faker.random.words(),
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
      });

      const songCount = getRandomNumberInRange(3, 10);

      for (let i = 0; i <= songCount; i++) {
        await knex("songs").insert({
          album_id: albumId,
          name: faker.random.words(),
        });
      }
    }
  }
};
