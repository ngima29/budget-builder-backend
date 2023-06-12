"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalProgressProgressDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.GoalProgressProgressDefs = (0, graphql_tag_1.default) `
#graphql

 enum GoalProgressType {
    income 
    expenses 
    investment
    others
   }

input InputGoalProgress {
    name: String
    type: GoalProgressType
    startDate: String
    endDate: String
    totalAmount: Int
    remarks: String
}

 type GoalProgress {
    id: Int
    userId: Int
    name: String
    type: GoalProgressType
    startDate: String
    endDate: String
    totalAmount: Int
    remarks: String
}
 
 type SingleGoalProgress {
  message: String
  data: GoalProgress
 }

 type PaginationGoalProgress {
  message: String
  data: [GoalProgress]
 }


extend type Mutation {
 createGoalProgress(input: InputGoalProgress!): SingleGoalProgress
 updateGoalProgress(id:Int!, input: InputGoalProgress!):SingleGoalProgress
 deleteGoalProgress(id:Int!):Message
}

extend type Query {
    GoalProgress(id:Int!): SingleGoalProgress
    GoalProgress(offset: Int, limit: Int, query: String, sort: SortEnum, order: String): PaginationGoalProgress
}

`;
