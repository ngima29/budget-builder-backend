import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';

export const GoalProgressProgressDefs: DocumentNode = gql`
#graphql
 scalar Date
 enum GoalProgressType {
    income 
    expenses 
    investment
    others
   }
input InputGoalProgress {
    name: String
    type: GoalProgressType
    startDate: Date
    endDate: Date
    totalAmount: Number
    remarks: String
}

 type GoalProgress {
    id: Int
    userId: Int
    name: String
    type: GoalProgressType
    startDate: Date
    endDate: Date
    totalAmount: Number
    remarks: String
}
 
 type SingleGoalProgress {
  message: String
  data: GoalProgress
 }

 type PaginationGoalProgresss {
  message: String
  data: [GoalProgress]
 }

type Message {
 message: String
}

extend type Mutation {
 createGoalProgress(input: InputGoalProgress!): SingleGoalProgress
 updateGoalProgress(id:Int!, input: InputGoalProgress!):SingleGoalProgress
 deleteGoalProgress(id:Int!):Message
}

extend type Query {
    GoalProgress(id:Int!): SingleGoalProgress
    GoalProgresss(offset: Int, limit: Int, query: String, sort: SortEnum, order: String): PaginationGoalProgresss
}

`;