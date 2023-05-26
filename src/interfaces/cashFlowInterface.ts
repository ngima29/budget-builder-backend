import * as Sequelize from 'sequelize';
import {CashFlowTypeEnum} from '../enums'
export interface InputCashFlowInterface {
    userId: Sequelize.CreationOptional<number>;
    categoryId: Sequelize.CreationOptional<number>;
    goalId? : Sequelize.CreationOptional<number>; // enum  category_Table['salary','investment','rent','partTimeJob','others']
    amount: number;
    description?: string;
    date: string;
    type: CashFlowTypeEnum;
}

export interface CashFlowInterface {
    id: Sequelize.CreationOptional<number>;
    userId : Sequelize.CreationOptional<number>;
    categoryId: Sequelize.CreationOptional<number>;
    goalId? : Sequelize.CreationOptional<number>;
    amount: number;
    description: string;
    date: string;
    type: CashFlowTypeEnum;
}

export interface CashFlowModelInterface extends Sequelize.Model<Partial<CashFlowInterface>,Partial<InputCashFlowInterface>>,
CashFlowInterface {}