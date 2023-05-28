import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';

export const GoalDefs: DocumentNode = gql`
#graphql
 scalar Date
 enum GoalType {
    income 
    expenses 
    investment
    others
   }
input InputGoal {
    name: String
    type: GoalType
    startDate: Date
    endDate: Date
    totalAmount: Number
    remarks: String
}

 type Goal {
    id: Int
    userId: Int
    name: String
    type: GoalType
    startDate: Date
    endDate: Date
    totalAmount: Number
    remarks: String
}
 
 type SingleGoal {
  message: String
  data: Goal
 }

 type PaginationGoals {
  message: String
  data: [Goal]
 }

type Message {
 message: String
}

extend type Mutation {
 createGoal(input: InputGoal!): SingleGoal
 updateGoal(id:Int!, input: InputGoal!):SingleGoal
 deleteGoal(id:Int!):Message
}

extend type Query {
    goal(id:Int!): SingleGoal
    goals(offset: Int, limit: Int, query: String, sort: SortEnum, order: String): PaginationGoals
}

`;