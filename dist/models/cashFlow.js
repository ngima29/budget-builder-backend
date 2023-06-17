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
exports.CashFlow = void 0;
const Sequelize = __importStar(require("sequelize"));
const instance_1 = require("./instance");
const enums_1 = require("../enums");
const sequelize = instance_1.Database.sequelize;
const CashFlow = sequelize.define('cash_flows', {
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
    category: {
        type: Sequelize.INTEGER,
        references: {
            model: 'categories',
            key: 'id',
        },
        field: 'categoryId',
    },
    goal: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'goals',
            key: 'id',
        },
        field: 'goalId',
    },
    amount: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    remarks: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    type: {
        type: Sequelize.ENUM(enums_1.CategoryTypeEnum.expenses, enums_1.CategoryTypeEnum.income, enums_1.CategoryTypeEnum.others),
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true,
});
exports.CashFlow = CashFlow;
