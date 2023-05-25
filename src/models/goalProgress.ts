import * as Sequelize from 'sequelize';
import {Database} from './instance';
import {GoalProgressModelInterface} from '../interfaces';

const sequelize = Database.sequelize;

const GoalProgress = sequelize.define<GoalProgressModelInterface>(
    'goal_progress',
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
        goalName: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'goals',
                key: 'id',
              },
          },
        endDate: {
            type: Sequelize.DATEONLY,
            allowNull:false,
          },

        // totalAmount: {
        //     type : Sequelize.NUMBER,
        //     allowNull: false,
        //   },
        // description: {
        //     type: Sequelize.TEXT,
        //     allowNull: true,
        //   }

    },{
        timestamps: true,
        paranoid: true,
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

export {GoalProgress};