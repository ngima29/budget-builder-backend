import * as Sequelize from 'sequelize';
import {LoanStatusEnum, LoanTypeEnum} from '../enums'
export interface InputLoanInterface {
  userId : Sequelize.CreationOptional<number>;
  amount: number;
  type: LoanTypeEnum; // enum (Received Loans, Given Loans) or (Borrowings , Lendings)
  description: string;
  date: string;
  returnDate: string;
  interestRate?: number;
  status: LoanStatusEnum ; // enum (paid , unpaid(default)) 
}

export interface LoanInterface {
  id: Sequelize.CreationOptional<number>
  userId : Sequelize.CreationOptional<number>;
  amount: number;
  type: LoanTypeEnum; // enum (Received Loans, Given Loans) or (Borrowings , Lendings)
  description: string;
  date: string;
  returnDate: string;
  interestRate: number;
  status: LoanStatusEnum ; // enum (paid , unpaid) 
}


export interface LoanModelInterface extends Sequelize.Model<Partial <LoanInterface>, Partial<InputLoanInterface>>,
LoanInterface {}