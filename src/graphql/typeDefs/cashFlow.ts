import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';

export const cashFlowDefs: DocumentNode = gql`#graphql

 enum CashFlowType {
    income
    expenses
   }

 enum SortEnum {
        desc
        asc
    }

input InputCashFlow {
    categoryId:Int
    goalId: Int
    amount: Int
    remarks: String
    date: String
    type: CashFlowType
}

 type CashFlow {
    id: Int
    userId:Int
    categoryId:Int
    goalId: Int
    amount: Int
    remarks: String
    date: String
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