# API

## Setup

1. Copy the environment example file and update values `cp .env.example .env`.
2. Setup docker containers `docker composer up`.
3. Migrate the database within the docker container: `docker exec -ti api_api_1 sh -c "npm run db:migrate"`.
4. Seed the database within the docker container: `docker exec -ti api_api_1 sh -c "npm run db:seed"`.
5. Hit http://localhost:4000/ in your browser for the API playground.

## Structure

The API is built with GraphQL using [Apollo Server](https://www.apollographql.com/docs/apollo-server/).

A MYSQl database is used for data storage using the [knex](https://knexjs.org/) query builder and the [objection js](https://vincit.github.io/objection.js/) ORM.

## Testing

To get setup with tests:

- Make sure all test database env variables are added in `.env`.
- Create your test database.
- Migrate your test database with `npm run test:setup-db`.
- Run your tests with `npm run test`.

[Jest](https://jestjs.io/) is used as the test runner.

An example test can be found [here](/packages/api/src/schema/types/album.test.js).
