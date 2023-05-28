import * as Sequelize from 'sequelize';
import {ModelTimestampExtend, PaginationOrderSearchExtend } from '.';


export interface InputGoalProgressInterface {
    userId: Sequelize.CreationOptional<number>;
    goalId: Sequelize.CreationOptional<number>; // front end ma dropdown ma  line input
    currentAmount: number; // targetAmount and  endDate and remaining days front end dekhaune
}

export interface GoalProgressInterface extends ModelTimestampExtend{
    id: Sequelize.CreationOptional<number>;
    userId : Sequelize.CreationOptional<number>;
    goalId : Sequelize.CreationOptional<number>;
    endDate: string;
    currentAmount: number;
    progressPercentage : number;
}

export interface GoalProgressModelInterface extends Sequelize.Model<Partial<GoalProgressInterface>,Partial<InputGoalProgressInterface>>,
GoalProgressInterface {}

export  interface ArgsGoalProgressInterface extends PaginationOrderSearchExtend{};