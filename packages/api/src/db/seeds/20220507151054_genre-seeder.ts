import faker from "faker";
import type { Knex } from "knex";

exports.seed = async (knex: Knex): Promise<void> => {
  const genreNames = new Array(20)
    .fill(null)
    .map(() => faker.music.genre())
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  await knex("genres").insert(
    genreNames.map((name) => {
      return { name };
    })
  );
};
