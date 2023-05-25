import * as Sequelize from "sequelize";
import { CategoryModelInterface} from '../interfaces';
import { Database } from "./instance";
import {CategoryTypeEnum} from '../enums'

const sequelize = Database.sequelize;

const Category = sequelize.define<CategoryModelInterface>(
    'categories',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false, 
            unique: true,   
        },
        type:{
            type: Sequelize.ENUM(CategoryTypeEnum.expenses,CategoryTypeEnum.income,CategoryTypeEnum.others),
            allowNull:false,
        },

    },{
        timestamps :true,
        paranoid: true,
        indexes: [
            {
                unique: true,
                name: 'categories_title_type',
                fields: ['title','type'],
                where :{
                    deleted_at: null,
                },
            },
        ],
    },
);

export { Category};