import * as Sequelize from 'sequelize';
import { CategoryTypeEnum } from '../enums';
import { ModelTimestampExtend, PaginationOrderSearchExtend } from '.';


export interface InputCategoryInterface {
    name: string;
    slug?: string;
    userId?: Sequelize.CreationOptional<number>;
    type: CategoryTypeEnum; // enum income, expenses, other

}

export interface CategoryInterface extends ModelTimestampExtend, InputCategoryInterface {
    id: Sequelize.CreationOptional<number>;
}


export interface CategoryModelInterface extends Sequelize.Model<Partial<CategoryInterface>, Partial<InputCategoryInterface>>,
    CategoryInterface { }


export interface ArgsCategoryInterface extends PaginationOrderSearchExtend {
    type?: CategoryTypeEnum;
}