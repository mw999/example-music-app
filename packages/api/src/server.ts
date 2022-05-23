import { ApolloServer } from "apollo-server";

import schema from "./schema/schema";

const server = new ApolloServer({
  ...schema,
  csrfPrevention: true,
});

export default server;
