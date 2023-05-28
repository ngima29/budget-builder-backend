import * as Sequelize from 'sequelize';
import {CashFlowTypeEnum} from '../enums'
import {ModelTimestampExtend, PaginationOrderSearchExtend } from '.';

export interface InputCashFlowInterface {
    userId: Sequelize.CreationOptional<number>;
    categoryId: Sequelize.CreationOptional<number>;
    goalId? : Sequelize.CreationOptional<number>; // enum  category_Table['salary','investment','rent','partTimeJob','others']
    amount: number;
    remarks?: string;
    date: string;
    type: CashFlowTypeEnum;
}

export interface CashFlowInterface extends ModelTimestampExtend{
    id: Sequelize.CreationOptional<number>;
    userId : Sequelize.CreationOptional<number>;
    categoryId: Sequelize.CreationOptional<number>;
    goalId? : Sequelize.CreationOptional<number>;
    amount: number;
    remarks: string;
    date: string;
    type: CashFlowTypeEnum;
}

export interface CashFlowModelInterface extends Sequelize.Model<Partial<CashFlowInterface>,Partial<InputCashFlowInterface>>,
CashFlowInterface {}

export  interface ArgsCashFlowInterface extends PaginationOrderSearchExtend{

}