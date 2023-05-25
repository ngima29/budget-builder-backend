import * as Sequelize from 'sequelize';

export interface InputExpenseInterface {
  userId : Sequelize.CreationOptional<number>;
  categoryId: Sequelize.CreationOptional<number>; // enum
  goalId? : Sequelize.CreationOptional<number>; // front end ma sabai expenses type bhaya dropdown ma dekhaune
  amount: number;
  description?: string;
  date: string;
}

export interface ExpenseInterface {
  id: Sequelize.CreationOptional<number>
  userId : Sequelize.CreationOptional<number>;
  categoryId: Sequelize.CreationOptional<number>; // enum
  goalId? : Sequelize.CreationOptional<number>;
  amount: number;
  description: string;
  date: string;
}


export interface ExpenseModelInterface extends Sequelize.Model<Partial <ExpenseInterface>, Partial<InputExpenseInterface>>,
ExpenseInterface {}