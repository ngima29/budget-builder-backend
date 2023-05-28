import * as Sequelize from 'sequelize';
import {Database} from './instance';
import {LoanModelInterface} from '../interfaces';
import {LoanStatusEnum, LoanTypeEnum} from "../enums";

const sequelize = Database.sequelize;

const Loan = sequelize.define<LoanModelInterface>(
    'loans',
    {
      id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
      userId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'user_id',
            references: {
              model: 'users',
              key: 'id',
            },
        },
      amount: {
            type: Sequelize.NUMBER,
            allowNull: false,
          },
      type: {
            type : Sequelize.ENUM(LoanTypeEnum.given,LoanTypeEnum.received),
            allowNull: false,
          },
      remarks: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
      
      slug: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
          },
      returnDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'return_date',
          },
      interestRate: {
            type: Sequelize.NUMBER,
            allowNull: true,
            field: 'interest_rate',
          },
      status: {
            type: Sequelize.ENUM(LoanStatusEnum.paid,LoanStatusEnum.pending,LoanStatusEnum.unpaid),
            allowNull: false,
        },

    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
    },
);

export {Loan};