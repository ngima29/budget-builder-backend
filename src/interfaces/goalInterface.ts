import * as Sequelize from 'sequelize';
import {GoalCategoryEnum} from '../enums';
import {ModelTimestampExtend, PaginationOrderSearchExtend } from '.';

export interface InputGoalInterface {
    userId : Sequelize.CreationOptional<number>;
    name: string;
    type: GoalCategoryEnum;// investment income expenses others
    startDate: string;
    endDate: string;
    totalAmount: number;
    remarks?: string;
}

export interface GoalInterface extends ModelTimestampExtend {
    id: Sequelize.CreationOptional<number>;
    userId : Sequelize.CreationOptional<number>;
    name: string;
    type: GoalCategoryEnum;// investment income expenses
    startDate: string;
    endDate: string;
    totalAmount: number;
    remarks: string;
}


export interface GoalModelInterface extends Sequelize.Model<Partial<GoalInterface >,Partial<InputGoalInterface>>,
GoalInterface  {};

export  interface ArgsGoalInterface extends PaginationOrderSearchExtend{};
