import * as Sequelize from "sequelize";
import { CashFlowModelInterface} from '../interfaces';
import { Database } from "./instance";
import {CashFlowTypeEnum} from "../enums"

//import {ModelTimestampExtend, PaginationOrderSearchExtend } from '.';
const sequelize = Database.sequelize;

const CashFlow = sequelize.define<CashFlowModelInterface>(
    'cash_flows',
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
        categoryId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'category_id',
            references: {
              model: 'categories',
              key: 'id',
            },
        },
        goalId:{
            type: Sequelize.INTEGER,
            allowNull:true,
            field: 'goal_id',
            references: {
              model: 'goals',
              key: 'id',
            },
        },
        amount:{
            type: Sequelize.NUMBER,
            allowNull: false,   
        },
        remarks:{
            type: Sequelize.STRING,
            allowNull:true,
        },
        date:{
            type: Sequelize.DATEONLY,
            allowNull: false,   
        },
        type: {
            type: Sequelize.ENUM(CashFlowTypeEnum.expenses,CashFlowTypeEnum.income),
            allowNull: false,
            
        }

    },{
        timestamps :true,
        paranoid: true,
        underscored: true,
    },
);

export { CashFlow};