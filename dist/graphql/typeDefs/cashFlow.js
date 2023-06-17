"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashFlowDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.cashFlowDefs = (0, graphql_tag_1.default) `#graphql
 scalar Date

input InputCashFlow {
    category: String
    goal: String
    amount: Int
    remarks: String
    date: String
    type: CategoryType
}

 type CashFlow {
    id: Int
    userId:Int
    categories: Category
    goal: String
    amount: Int
    remarks: String
    date: String
    type: CategoryType
}
 
 type SingleCashFlow {
  message: String
  data: CashFlow
 }

 type PaginationCashFlow {
  message: String
  data: [CashFlow]
 }
  
  type CashFlowsCount {
   income: Float
   expenses: Float
    total: Float
  }

 type CashFlowsCountSummery{
    message: String
    data: CashFlowsCount
 }

extend type Mutation {
 createCashFlow(input: InputCashFlow!): SingleCashFlow
 updateCashFlow(id:Int!, input: InputCashFlow!):SingleCashFlow
 deleteCashFlow(id:Int!):Message
}

extend type Query {
    cashFlow(id:Int!): SingleCashFlow
    cashFlows(offset: Int, limit: Int, query: String, sort: SortEnum, order: String, type: CategoryType): PaginationCashFlow
    cashFlowsCountSummaries(fromDate: Date, toDate: Date):CashFlowsCountSummery
}

`;
