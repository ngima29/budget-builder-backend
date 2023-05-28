import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';

export const InvestmentDefs: DocumentNode = gql`
#graphql
 scalar Date

 enum InvestmentType {
    stock 
    commodity
    mutual_fund 
    real_estate 
    sip 
    bond
    others 
   }
input InputInvestment {
    name: String
    type: InvestmentType
    amount: Number
    remarks: String
    date: Date
}

 type Investment {
    id: Int
    userId: Int
    name: String
    type: InvestmentType
    amount: Number
    remarks: String
    date: Date
}
 
 type SingleInvestment {
  message: String
  data: Investment
 }

 type PaginationInvestments {
  message: String
  data: [Investment]
 }

type Message {
 message: String
}

extend type Mutation {
 createInvestment(input: InputInvestment!): SingleInvestment
 updateInvestment(id:Int!, input: InputInvestment!):SingleInvestment
 deleteInvestment(id:Int!):Message
}

extend type Query {
    investment(id:Int!): SingleInvestment
    investments(offset: Int, limit: Int, query: String, sort: SortEnum, order: String): PaginationInvestments
}

`;