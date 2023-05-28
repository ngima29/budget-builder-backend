import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';

export const GoalProgressProgressDefs: DocumentNode = gql`
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