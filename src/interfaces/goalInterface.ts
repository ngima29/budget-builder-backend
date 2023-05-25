import * as Sequelize from 'sequelize';
import {GoalCategoryEnum} from '../enums';


export interface InputGoalInterface {
    userId : Sequelize.CreationOptional<number>;
    name: string;
    type: GoalCategoryEnum;// investment income expenses others
    startDate: string;
    endDate: string;
    totalAmount: number;
    description?: string;
}

export interface GoalInterface  {
    id: Sequelize.CreationOptional<number>;
    userId : Sequelize.CreationOptional<number>;
    name: string;
    type: GoalCategoryEnum;// investment income expenses
    startDate: string;
    endDate: string;
    totalAmount: number;
    description: string;
}


export interface GoalModelInterface extends Sequelize.Model<Partial<GoalInterface >,Partial<InputGoalInterface>>,
GoalInterface  {}