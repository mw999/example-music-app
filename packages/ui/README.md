# UI

## Setup

1. Copy the environment example file and update values `cp .env.example .env`.
2. Install dependencies `npm install`.
3. Start app `npm start`.

## Structure

The UI is a React SPA that uses [Vite](https://vitejs.dev/) to run and build the app locally.

The app connects to the Apollo API using [Apollo Client](https://www.apollographql.com/docs/react/).

Each route of the app is rendered via [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview).

All UI components pull from the [DesignSystem](/src/Components/DesignSystem) components directory. In a real world application, these would live in their own package, and have substantial more styles applied.

## Testing

Tests can be ran with `npm run test`.

[Vitest](https://vitest.dev/) is used as the test runner in combination with [Vite](https://vitejs.dev/).

[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is used to unit testing the application, rendering each component that needs testing, performing actions in the dom, and expecting a result.

An example test can be found [here](/packages/ui/src/Components/AlbumDetails.test.jsx).
