import * as Sequelize from 'sequelize';
import { CategoryTypeEnum } from '../enums'
import { ModelTimestampExtend, PaginationOrderSearchExtend } from '.';

export interface InputCashFlowInterface {
    userId: Sequelize.CreationOptional<number>;
    category: string | number;
    goal?: string | number; // enum  category_Table['salary','investment','rent','partTimeJob','others']
    amount: number;
    remarks: string;
    date: string;
    type: CategoryTypeEnum;
}

export interface CashFlowInterface extends ModelTimestampExtend, InputCashFlowInterface {
    id: Sequelize.CreationOptional<number>;
}

export interface CashFlowModelInterface extends Sequelize.Model<Partial<CashFlowInterface>, Partial<InputCashFlowInterface>>,
    CashFlowInterface { }

export interface ArgsCashFlowInterface extends PaginationOrderSearchExtend {
    type?: CategoryTypeEnum;
}