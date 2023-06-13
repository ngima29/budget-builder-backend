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
exports.LoanService = void 0;
const Sequelize = __importStar(require("sequelize"));
const slug_1 = __importDefault(require("slug"));
const helpers_1 = require("../helpers");
const repositories_1 = require("../repositories");
class LoanService {
    repository;
    constructor() {
        this.repository = new repositories_1.LoanRepository();
    }
    async create(input) {
        const loanSlug = (0, slug_1.default)(input.remarks);
        const existingLoan = await this.repository.findOne({
            where: { slug: loanSlug, type: input.type, amount: input.amount },
        });
        if (existingLoan)
            throw new Error("Loan is already Exist");
        input.slug = loanSlug;
        const loan = await this.repository.create(input);
        return loan;
    }
    async findByPk(id, options = { exclude: ['deletedAt'] }) {
        const loanExists = await this.repository.findByPk(id);
        if (!loanExists)
            throw new Error(`Loan: ${id} does not exist!`);
        return loanExists;
    }
    async updateOne(id, input) {
        const loanExists = await this.repository.findByPk(id);
        if (!loanExists)
            throw new Error(`Loan: ${id} does not exist!`);
        if (input.remarks) {
            const loanRemarksSlug = (0, slug_1.default)(input.remarks.toString());
            const existingLoanSlug = await this.repository.findOne({
                where: { slug: loanRemarksSlug, type: input.type },
            });
            if (existingLoanSlug)
                throw new Error(`Investment Name: ${input.remarks} is already exist`);
            input.slug = loanRemarksSlug;
        }
        await this.repository.updateOne({
            id: id,
            input: input,
        });
        return this.findByPk(id);
    }
    async deleteOne(id) {
        const loanExists = await this.repository.findByPk(id);
        if (!loanExists)
            throw new Error(`Loan: ${id} does not exist`);
        const remove = await this.repository.deleteOne(id);
        if (remove === 0)
            throw new Error(`Loan: ${id} does not exist`);
        return true;
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
    findAndCountAll({ offset, limit, query, sort, order, status, type }) {
        let where = {
        // deleted_at: null,
        };
        if (query) {
            where = {
                ...where,
                [Sequelize.Op.or]: helpers_1.SequlizeQueryGenerator.searchRegex({
                    query,
                    columns: ['type', 'amount', 'status'],
                }),
            };
        }
        if (status) {
            where = { ...where, status: status };
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
}
exports.LoanService = LoanService;
