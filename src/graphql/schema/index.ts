import { buildSubgraphSchema } from '@apollo/subgraph';
import {
  investmentResolvers,
  loanResolvers,
  userResolvers,
} from '../resolvers';
import {
  InvestmentDefs,
  LoanDefs,
  userDefs,
} from '../typeDefs';

export const schema = buildSubgraphSchema([
  { typeDefs: InvestmentDefs, resolvers: investmentResolvers },
  { typeDefs: LoanDefs, resolvers: loanResolvers },
  { typeDefs: userDefs, resolvers: userResolvers },
]);