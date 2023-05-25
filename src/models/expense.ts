import * as Sequelize from "sequelize";
import { ExpenseModelInterface} from '../interfaces';
import { Database } from "./instance";

const sequelize = Database.sequelize;

const Expense = sequelize.define<ExpenseModelInterface>(
    'expenses',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'user_id',
            references: {
              model: 'users',
              key: 'id',
            },
        },
        categoryId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'category_id',
            references: {
              model: 'categories',
              key: 'id',
            },
        },
        goalId:{
            type: Sequelize.INTEGER,
            allowNull:true,
            field: 'goal_id',
            references: {
              model: 'goals',
              key: 'id',
            },
        },
        amount:{
            type: Sequelize.NUMBER,
            allowNull: false,   
        },
        description:{
            type: Sequelize.STRING,
            allowNull:true,
        },
        date:{
            type: Sequelize.DATEONLY,
            allowNull: false,   
        },

    },{
        timestamps :true,
        paranoid: true,
        underscored: true,
    },
);

export { Expense};