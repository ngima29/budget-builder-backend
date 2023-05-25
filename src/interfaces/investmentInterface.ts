import * as Sequelize from 'sequelize';
import {InvestmentTypeEnum} from "../enums";
export interface InputInvestmentInterface {
    userId: Sequelize.CreationOptional<number>;
    name: string;
    type: InvestmentTypeEnum; // enum (share, mutualFunds, sip, real_eState, others, )
    description?: string;
    date :string;
}

export interface InvestmentInterface  {
    id: Sequelize.CreationOptional<number>;
    userId: Sequelize.CreationOptional<number>;
    name: string;
    type: InvestmentTypeEnum;
    description: string;
    date :string;
}


export interface InvestmentModelInterface extends Sequelize.Model<Partial<InvestmentInterface >,Partial<InputInvestmentInterface>>,
InvestmentInterface  {}