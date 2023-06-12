"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Investment = void 0;
const Sequelize = __importStar(require("sequelize"));
const instance_1 = require("./instance");
const enums_1 = require("../enums");
const sequelize = instance_1.Database.sequelize;
const Investment = sequelize.define('investments', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
        type: Sequelize.ENUM(enums_1.InvestmentTypeEnum.bond, enums_1.InvestmentTypeEnum.commodity, enums_1.InvestmentTypeEnum.mutualFund, enums_1.InvestmentTypeEnum.others, enums_1.InvestmentTypeEnum.realEstate, enums_1.InvestmentTypeEnum.sip, enums_1.InvestmentTypeEnum.stock),
        allowNull: false,
    },
    amount: {
        type: Sequelize.NUMBER,
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
}, {
    timestamps: true,
    paranoid: true,
    indexes: [
        {
            unique: true,
            name: 'investments_slug_type',
            fields: ['slug', 'type'],
            where: {
                deleted_at: null,
            },
        },
    ],
});
exports.Investment = Investment;
