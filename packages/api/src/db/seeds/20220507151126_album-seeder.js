const faker = require("faker");

// https://stackoverflow.com/a/7228322
const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// https://stackoverflow.com/a/5915122
const getRandomItemFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

exports.seed = async (knex) => {
  const genres = await knex.select("id").from("genres");

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
