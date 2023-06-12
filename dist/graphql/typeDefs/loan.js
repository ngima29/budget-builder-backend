"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.LoanDefs = (0, graphql_tag_1.default) `
#graphql


 enum LoanType {
    received
    given
   }
 enum LoanStatus {
    pending
    paid
    unpaid
   }

input InputLoan {
    amount: Int
    type: LoanType
    remarks: String
    date: String
    returnDate: String
    interestRate: Int
    status: LoanStatus
}

 type Loan {
    id: Int
    userId: Int
    amount: Int
    type: LoanType
    remarks: String
    date: String
    returnDate: String
    interestRate: Int
    status: LoanStatus
}
 
 type SingleLoan {
  message: String
  data: Loan
 }

 type PaginationLoans {
  message: String
  data: [Loan]
 }


extend type Mutation {
 createLoan(input: InputLoan!): SingleLoan
 updateLoan(id:Int!, input: InputLoan!):SingleLoan
 deleteLoan(id:Int!):Message
}

extend type Query {
    loan(id:Int!): SingleLoan
    loans(offset: Int, limit: Int, query: String, sort: SortEnum, order: String, status:LoanStatus,type: LoanType  ): PaginationLoans
}

`;
