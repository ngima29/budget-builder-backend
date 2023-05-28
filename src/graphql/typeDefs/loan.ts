import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';

export const LoanDefs: DocumentNode = gql`
#graphql
 scalar Date

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
    amount: Number
    type: LoanType
    remarks: String
    date: Date
    returnDate: Date
    interestRate: Number
    status: LoanStatus
}

 type Loan {
    id: Int
    userId: Int
    amount: Number
    type: LoanType
    remarks: String
    date: Date
    returnDate: Date
    interestRate: Number
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

type Message {
 message: String
}

extend type Mutation {
 createLoan(input: InputLoan!): SingleLoan
 updateLoan(id:Int!, input: InputLoan!):SingleLoan
 deleteLoan(id:Int!):Message
}

extend type Query {
    loan(id:Int!): SingleLoan
    loans(offset: Int, limit: Int, query: String, sort: SortEnum, order: String): PaginationLoans
}

`;