import * as Sequelize from 'sequelize';
import {Database} from './instance';
import {InvestmentModelInterface} from '../interfaces';
import {InvestmentTypeEnum} from "../enums";
const sequelize = Database.sequelize;

const Investment = sequelize.define<InvestmentModelInterface>(
    'investments',
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
      slug: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
      type: {
            type : Sequelize.ENUM(InvestmentTypeEnum.bond,InvestmentTypeEnum.commodity,InvestmentTypeEnum.mutual_fund,InvestmentTypeEnum.others,InvestmentTypeEnum.real_estate,InvestmentTypeEnum.sip,InvestmentTypeEnum.stock),
            allowNull: false,
          },
      remarks: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },

    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
    },
);

export {Investment};