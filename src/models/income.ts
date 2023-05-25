import * as Sequelize from 'sequelize';
import {Database} from './instance';
import {IncomeModelInterface} from '../interfaces';

const sequelize = Database.sequelize;

const Income = sequelize.define<IncomeModelInterface>(
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
        categoryId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'category_id',
            references: {
              model: 'categories',
              key: 'id',
            },
        },
        // name: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        //   },
       
       

        amount: {
            type : Sequelize.NUMBER,
            allowNull: false,
          },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        }

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

export {Income};