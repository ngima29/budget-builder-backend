import * as Sequelize from 'sequelize';
import {Database} from './instance';
import {GoalModelInterface} from '../interfaces';
import {GoalCategoryEnum} from '../enums';

const sequelize = Database.sequelize;

const Goal = sequelize.define<GoalModelInterface>(
    'goals',
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
        name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        type:{
            type: Sequelize.ENUM(GoalCategoryEnum.expenses,GoalCategoryEnum.income,GoalCategoryEnum.investment,GoalCategoryEnum.others),
            allowNull: false,
          },
        startDate:{
            type: Sequelize.DATEONLY,
            allowNull:false,
          },
        endDate: {
            type: Sequelize.DATEONLY,
            allowNull:false,
          },

        totalAmount: {
            type : Sequelize.NUMBER,
            allowNull: false,
          },
        remarks: {
            type: Sequelize.TEXT,
            allowNull: true,
          }

    },{
        timestamps: true,
        paranoid: true,
        underscored:true,
        indexes: [
            {
                unique: true,
                name: 'goals_name_type_endDate',
                fields: ['name','type','endDate'],
                where: {
                    deleted_at : null,
                },
            },
        ],

    },
);

export {Goal};