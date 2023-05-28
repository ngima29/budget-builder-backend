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
            autoIncrement: true,
            primaryKey: true,
          },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        slug: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
        parentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        level: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          type:{
            type: Sequelize.ENUM(CategoryTypeEnum.expenses,CategoryTypeEnum.income,CategoryTypeEnum.others),
            allowNull:false,
        },

    },{
        timestamps :true,
        paranoid: true,
        underscored:true,
        indexes: [
            {
                unique: true,
                name: 'categories_name_parentId_type',
                fields: ['name','parentId','type'],
                where :{
                    deleted_at: null,
                },
            },
        ],
    },
);

export { Category};