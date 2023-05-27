import { buildSubgraphSchema } from '@apollo/subgraph';
import {
  userResolvers,
} from '../resolvers';
import {
  userDefs,
} from '../typeDefs';

export const schema = buildSubgraphSchema([
  { typeDefs: userDefs, resolvers: userResolvers },
]);