import * as Sequelize from 'sequelize';
import {CategoryTypeEnum} from '../enums'
export interface InputCategoryInterface {
    title: string;
    type: CategoryTypeEnum; // enum income, expenses, other
}

export interface CategoryInterface {
    id: Sequelize.CreationOptional<number>;
    title: string;
    type: CategoryTypeEnum;
}


export interface CategoryModelInterface extends Sequelize.Model<Partial<CategoryInterface>,Partial<InputCategoryInterface>>,
CategoryInterface {}