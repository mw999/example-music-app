# graphql-training

## Setup

1. Setup repo via `npm run setup`
2. Setup backend using the [API package readme](/packages/api/README.md)
3. Setup frontend using the [UI package readme](/packages/ui/README.md)

## Repo structure

This is a [Lerna](https://github.com/lerna/lerna) monorepo consisting of two apps, a Node API that using a MYSQL database, and a React SPA that connects to the Node API.

Each package handles it's own builds, development servers and tests. With the root of the repo managing code style ([Prettier](https://prettier.io/)) and code validity ([ESLint](https://eslint.org/)).

[Husky] is used with [lint-staged](https://github.com/okonet/lint-staged) to run [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) on pre commit, to ensure new code is styled correctly and valid.

More information of per application setup can be found in the [UI](/packages/ui/README.md) and [API](/packages/api/README.md) readmes,

## CI

On every pull request, a github action runs to check the changed code. The config can be found [here](/.github/workflows/prs.yml).

The workflow performs the following:

- Runs on every PR (except drafts)
- Installs dependencies
- Lints all code using ESLint
- Runs tests in every package
