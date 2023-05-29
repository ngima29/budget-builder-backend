import * as Sequelize from 'sequelize';
import {CategoryTypeEnum} from '../enums';
import {ModelTimestampExtend, PaginationOrderSearchExtend } from '.';


export interface InputCategoryInterface {
    name: string;
    slug?: string;
    type: CategoryTypeEnum; // enum income, expenses, other

}

export interface CategoryInterface extends ModelTimestampExtend {
    id: Sequelize.CreationOptional<number>;
    name: string;
    slug: string;
    type: CategoryTypeEnum; // enum income, expenses, other
}


export interface CategoryModelInterface extends Sequelize.Model<Partial<CategoryInterface>,Partial<InputCategoryInterface>>,
CategoryInterface {}


export  interface ArgsCategoryInterface extends PaginationOrderSearchExtend{

}