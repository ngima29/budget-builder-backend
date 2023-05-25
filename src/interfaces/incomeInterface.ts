import * as Sequelize from 'sequelize';

export interface InputIncomeInterface {
    userId: Sequelize.CreationOptional<number>;
    categoryId: Sequelize.CreationOptional<number>;
    goalId? : Sequelize.CreationOptional<number>; // enum  category_Table['salary','investment','rent','partTimeJob','others']
    amount: number;
    description?: string;
    date: string;
}

export interface IncomeInterface {
    id: Sequelize.CreationOptional<number>;
    userId : Sequelize.CreationOptional<number>;
    categoryId: Sequelize.CreationOptional<number>;
    goalId? : Sequelize.CreationOptional<number>;
    amount: number;
    description: string;
    date: string;
}

export interface IncomeModelInterface extends Sequelize.Model<Partial<IncomeInterface>,Partial<InputIncomeInterface>>,
IncomeInterface {}