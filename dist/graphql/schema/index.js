"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const subgraph_1 = require("@apollo/subgraph");
const resolvers_1 = require("../resolvers");
const typeDefs_1 = require("../typeDefs");
exports.schema = (0, subgraph_1.buildSubgraphSchema)([
    { typeDefs: typeDefs_1.cashFlowDefs, resolvers: resolvers_1.cashFlowResolvers },
    { typeDefs: typeDefs_1.CategoryDefs, resolvers: resolvers_1.categoryResolvers },
    { typeDefs: typeDefs_1.GoalDefs, resolvers: resolvers_1.goalResolvers },
    { typeDefs: typeDefs_1.InvestmentDefs, resolvers: resolvers_1.investmentResolvers },
    { typeDefs: typeDefs_1.LoanDefs, resolvers: resolvers_1.loanResolvers },
    { typeDefs: typeDefs_1.userDefs, resolvers: resolvers_1.userResolvers },
]);
