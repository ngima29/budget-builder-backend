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
exports.CashFlowService = void 0;
const Sequelize = __importStar(require("sequelize"));
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const repositories_1 = require("../repositories");
class CashFlowService {
    repository;
    constructor() {
        this.repository = new repositories_1.CashFlowRepository();
    }
    async create(input) {
        const existingCashFlow = await this.repository.findOne({
            where: { categoryId: input.category, type: input.type, remarks: input.remarks, date: input.date, amount: input.amount },
        });
        if (existingCashFlow)
            throw new Error("this Transaction is already Exist");
        const cashFlow = await this.repository.create(input);
        return cashFlow;
    }
    async findByPk(id, options = { exclude: ['deletedAt'] }) {
        const cashFlowExists = await this.repository.findByPk(id);
        if (!cashFlowExists)
            throw new Error(`Transaction: ${id} does not exist!`);
        return cashFlowExists;
    }
    async updateOne(id, input) {
        const cashFlowExists = await this.repository.findByPk(id);
        if (!cashFlowExists)
            throw new Error(`Transaction: ${id} does not exist!`);
        const existingCashFlow = await this.repository.findOne({
            where: { categoryId: input.category, type: input.type, remarks: input.remarks, date: input.date, amount: input.amount },
        });
        await this.repository.updateOne({
            id: id,
            input: input,
        });
        return this.findByPk(id);
    }
    async deleteOne(id) {
        const cashFlowExists = await this.repository.findByPk(id);
        if (!cashFlowExists)
            throw new Error(`Transaction: ${id} does not exist`);
        const remove = await this.repository.deleteOne(id);
        if (remove === 0)
            throw new Error(`Transaction: ${id} does not exist`);
        return true;
    }
    findAndCountAll({ offset, limit, query, sort, order, type }) {
        let where = {
        // deleted_at: null,
        };
        if (query) {
            where = {
                ...where,
                [Sequelize.Op.or]: helpers_1.SequlizeQueryGenerator.searchRegex({
                    query,
                    columns: ['type', 'amount', 'categoryId'],
                }),
            };
        }
        if (type) {
            where = { ...where, type: type };
        }
        return this.repository.findAndCountAll({
            where,
            offset,
            limit,
            order: [[order, sort]],
            distinct: true,
            include: [
                {
                    model: models_1.Category,
                    as: 'categories',
                    attributes: ['id', 'name', 'type']
                }
            ]
        });
    }
    async sum({ type, userId, fromDate, toDate, }) {
        let where = {};
        if (userId) {
            where = { ...where, userId: userId };
        }
        if (fromDate && toDate) {
            where = { ...where, createdAt: { [Sequelize.Op.between]: [fromDate, toDate] } };
        }
        if (type) {
            where = { ...where, type: type };
        }
        return await this.repository.sum({ where }, 'amount');
    }
}
exports.CashFlowService = CashFlowService;
