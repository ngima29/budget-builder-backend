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
            references: {
              model: 'users',
              key: 'id',
            },
        },
      goalId: {
            type: Sequelize.INTEGER,
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

        currentAmount: {
            type : Sequelize.NUMBER,
            allowNull: false,
          },
    },{
        timestamps: true,
        paranoid: true,
    },
);

export {GoalProgress};