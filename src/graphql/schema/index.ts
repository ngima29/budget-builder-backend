import { buildSubgraphSchema } from '@apollo/subgraph';
import {
  categoryResolvers,
  goalResolvers,
  investmentResolvers,
  loanResolvers,
  userResolvers,
} from '../resolvers';
import {
  CategoryDefs,
  GoalDefs,
  InvestmentDefs,
  LoanDefs,
  userDefs,
} from '../typeDefs';

export const schema = buildSubgraphSchema([
  { typeDefs: CategoryDefs, resolvers: categoryResolvers },
  { typeDefs: GoalDefs, resolvers: goalResolvers },
  { typeDefs: InvestmentDefs, resolvers: investmentResolvers },
  { typeDefs: LoanDefs, resolvers: loanResolvers },
  { typeDefs: userDefs, resolvers: userResolvers },
]);