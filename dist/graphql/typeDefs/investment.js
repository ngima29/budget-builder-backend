"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.InvestmentDefs = (0, graphql_tag_1.default) `
#graphql


 enum InvestmentType {
    stock 
    commodity
    mutualFund 
    realEstate 
    sip 
    bond
    others 
   }
input InputInvestment {
    name: String
    type: InvestmentType
    amount: Int
    remarks: String
    date: String
}

 type Investment {
    id: Int
    userId: Int
    name: String
    type: InvestmentType
    amount: Int
    remarks: String
    date: String
}
 
 type SingleInvestment {
  message: String
  data: Investment
 }

 type PaginationInvestments {
  message: String
  data: [Investment]
 }

 type investmentsCount {
    total: Float
  }

 type investmentsCountSummery{
    message: String
    data: investmentsCount
 }

extend type Mutation {
 createInvestment(input: InputInvestment!): SingleInvestment
 updateInvestment(id:Int!, input: InputInvestment!):SingleInvestment
 deleteInvestment(id:Int!):Message
}

extend type Query {
    investment(id:Int!): SingleInvestment
    investments(offset: Int, limit: Int, query: String, sort: SortEnum, order: String, type: InvestmentType): PaginationInvestments
    investmentsCountSummaries(fromDate: Date, toDate: Date):investmentsCountSummery
}

`;
