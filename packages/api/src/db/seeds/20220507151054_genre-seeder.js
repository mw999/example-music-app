const faker = require("faker");

exports.seed = async (knex) => {
  const genreNames = new Array(20).fill(null).map(() => faker.music.genre());
  const uniqueGenreNames = [...new Set(genreNames)];

  await knex("genres").insert(
    uniqueGenreNames.map((name) => {
      return { name };
    })
  );
};
