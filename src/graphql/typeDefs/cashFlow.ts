import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';

export const cashFlowDefs: DocumentNode = gql`
#graphql
scalar Date
 enum CashFlowType {
    income
    expenses
   }
input InputCashFlow {
    categoryId:Number
    goalId: Number
    amount: Number
    remarks: String
    date: Date
    type: CashFlowType
}

 type CashFlow {
    id: Int
    userId:Number
    categoryId:Number
    goalId: Number
    amount: Number
    remarks: String
    date: Date
    type: CashFlowType
}
 
 type SingleCashFlow {
  message: String
  data: CashFlow
 }

 type PaginationCashFlow {
  message: String
  data: [CashFlow]
 }

type Message {
 message: String
}
extend type Mutation {
 createCashFlow(input: InputCashFlow!): SingleCashFlow
 updateCashFlow(id:Int!, input: InputCashFlow!):SingleCashFlow
 deleteCashFlow(id:Int!):Message
}

extend type Query {
    cashFlow(id:Int!): SingleCashFlow
    cashFlows(offset: Int, limit: Int, query: String, sort: SortEnum, order: String): PaginationCashFlow
}

`;