# Artlist Assessment

## Setup

1. Setup repo via `npm run setup`
2. Setup backend using the [API package readme](/packages/api/README.md)
3. Setup frontend using the [UI package readme](/packages/ui/README.md)

## Repo structure

This is a [Lerna](https://github.com/lerna/lerna) monorepo consisting of two apps, a Node API that using a MYSQL database, and a React SPA that connects to the Node API.

Each package handles it's own builds, development servers and tests. With the root of the repo managing code style ([Prettier](https://prettier.io/)) and code validity ([ESLint](https://eslint.org/)).

[Husky] is used with [lint-staged](https://github.com/okonet/lint-staged) to run [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) on pre commit, to ensure new code is styled correctly and valid.

More information of per application setup can be found in the [UI](/packages/ui/README.md) and [API](/packages/api/README.md) readmes,

## Assessment Criteria

This application completes the following user stories:

- As a user, I can create an empty album with a name property.
- As a user, I can add new music tracks to an existing album with a track name, artist and genre.
- As a user, I can view all albums and music tracks which have been created.
- As a user, I can delete an entire album and all of its music tracks in one action.
- As a user, I can update the track name, artist and genre of an existing track.
- As a user, I can delete one or many tracks from an album in one action.

It also completes the following bonus items:

- Containerisation (docker-compose): The API package can be ran within a docker container using docker-compose.
- A relational database - A MYSQl database is used within the container above and connects to the API.
- Tests (unit and/or integration) - The UI is unit tested using React Testing Library, and the API includes integrations tests that tests the API using a real database.
- Documentation of API - Apollo Server ships with built in documentation for its GraphQL schema. This was a core reason for choosing it.
- Thoughtful project structure and code patterns
- Good developer onboarding steps in the readme file

## CI

On every pull request, a github action runs to check the changed code. The config can be found [here](/.github/workflows/prs.yml).

The workflow performs the following:

- Runs on every PR (except drafts)
- Installs dependencies
- Lints all code using ESLint
- Runs tests in every package

Examples CI runs can be found below:

- A CI run that passes: https://github.com/mw999/artlist-assessment/runs/6355469467
- A CI run that fails because of linting: https://github.com/mw999/artlist-assessment/actions/runs/2295415302
- A CI run that fails because of tests: https://github.com/mw999/artlist-assessment/runs/6355596608
