import types from "./types/index";

const defaultTypeDefs = `
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
  type Subscription {
    root: String
  }
`;

type Schema = { typeDefs: string[]; resolvers: any[] };

// Merge all of our types together, forming the schema.
const schema = Object.values(types).reduce<Schema>(
  (allTypes: Schema, currentTypes: { typeDefs: string; resolvers: any }) => {
    allTypes.typeDefs = allTypes.typeDefs.concat(currentTypes.typeDefs);

    if (currentTypes.resolvers) {
      allTypes.resolvers = allTypes.resolvers.concat(currentTypes.resolvers);
    }

    return allTypes;
  },
  {
    typeDefs: [defaultTypeDefs],
    resolvers: [],
  }
);

export default schema;
