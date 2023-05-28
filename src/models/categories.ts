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
        indexes: [
            {
                unique: true,
                name: 'categories_slug_parent_id_type',
                fields: ['slug','parentId','type'],
                where :{
                    deleted_at: null,
                },
            },
        ],
    },
);

export { Category};