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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentService = void 0;
const Sequelize = __importStar(require("sequelize"));
const slug_1 = __importDefault(require("slug"));
const helpers_1 = require("../helpers");
const repositories_1 = require("../repositories");
class InvestmentService {
    repository;
    constructor() {
        this.repository = new repositories_1.InvestmentRepository();
    }
    async create(input) {
        const investmentSlug = (0, slug_1.default)(input.name);
        const existingInvestment = await this.repository.findOne({
            where: { slug: investmentSlug, type: input.type }
        });
        if (existingInvestment)
            throw new Error(`Investment name already Exist`);
        input.slug = investmentSlug;
        const investment = await this.repository.create(input);
        return investment;
    }
    async findByPk(id, options = { exclude: ['deletedAt'] }) {
        const investmentExists = await this.repository.findByPk(id);
        if (!investmentExists)
            throw new Error(`Investment ${id} does not exist`);
        return investmentExists;
    }
    async updateOne(id, input) {
        const investmentExists = await this.repository.findByPk(id);
        if (!investmentExists)
            throw new Error(`Investment ${id} does not exist`);
        if (input.name) {
            const investmentSlug = (0, slug_1.default)(input.name.toString());
            const existingInvestment = await this.repository.findOne({
                where: { slug: investmentSlug, type: input.type },
            });
            if (existingInvestment)
                throw new Error(`Investment Name: ${input.name} is already exist`);
            input.slug = investmentSlug;
        }
        await this.repository.updateOne({
            id: id,
            input: input,
        });
        return this.findByPk(id);
    }
    async deleteOne(id) {
        const investmentExists = await this.repository.findByPk(id);
        if (!investmentExists)
            throw new Error(`Investment: ${id} does not exist!`);
        const remove = await this.repository.deleteOne(id);
        if (remove === 0)
            throw new Error(`Investment: ${id} does not exist!`);
        return true;
    }
    findAndCountAll({ offset, limit, query, sort, order, type }) {
        let where = {};
        if (query) {
            where = {
                ...where,
                [Sequelize.Op.or]: helpers_1.SequlizeQueryGenerator.searchRegex({
                    query,
                    columns: ['name', 'amount'],
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
        });
    }
    async sum({ userId, fromDate, toDate, }) {
        let where = {};
        if (userId) {
            where = { ...where, userId: userId };
        }
        if (fromDate && toDate) {
            where = { ...where, createdAt: { [Sequelize.Op.between]: [fromDate, toDate] } };
        }
        return await this.repository.sum({ where }, 'amount');
    }
}
exports.InvestmentService = InvestmentService;
