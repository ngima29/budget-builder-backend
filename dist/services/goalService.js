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
exports.GoalService = void 0;
const Sequelize = __importStar(require("sequelize"));
const slug_1 = __importDefault(require("slug"));
const helpers_1 = require("../helpers");
const repositories_1 = require("../repositories");
class GoalService {
    repository;
    constructor() {
        this.repository = new repositories_1.GoalRepository();
    }
    async create(input) {
        const goalSlug = (0, slug_1.default)(input.name);
        const existingGoal = await this.repository.findOne({
            where: { slug: goalSlug, type: input.type }
        });
        if (existingGoal)
            throw new Error(`goal name already Exist`);
        input.slug = goalSlug;
        const goal = await this.repository.create(input);
        return await this.repository.findByPk(goal.id);
    }
    async findByPk(id, options = { exclude: ['deletedAt'] }) {
        const goalExists = await this.repository.findByPk(id);
        if (!goalExists) {
            throw new Error(`Goal ${id} does not exist`);
        }
        const currentDate = new Date();
        const progressPercentage = (goalExists.currentAmount / goalExists.totalAmount) * 100;
        const goalEndDate = new Date(goalExists.endDate);
        goalEndDate.setHours(0, 0, 0, 0);
        const startDate = new Date(goalExists.startDate);
        startDate.setHours(0, 0, 0, 0);
        const totalDays = Math.ceil((goalEndDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
        let remainingDays = Math.ceil((goalEndDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000));
        remainingDays = (remainingDays < 0) ? remainingDays = 0 : remainingDays;
        const updatedGoal = {
            id: goalExists.id,
            userId: goalExists.userId,
            name: goalExists.name,
            slug: goalExists.slug,
            type: goalExists.type,
            startDate: goalExists.startDate,
            endDate: goalExists.endDate,
            totalAmount: goalExists.totalAmount,
            currentAmount: goalExists.currentAmount,
            remarks: goalExists.remarks,
            remainingDays,
            progressPercentage,
            totalDays,
            createdAt: goalExists.createdAt,
            updatedAt: goalExists.updatedAt,
        };
        return updatedGoal;
    }
    async updateOne(id, input) {
        const goalExists = await this.repository.findByPk(id);
        if (!goalExists)
            throw new Error(`goal ${id} does not exist`);
        if (input.name) {
            const goalSlug = (0, slug_1.default)(input.name.toString());
            const existingGoal = await this.repository.findOne({
                where: { slug: goalSlug, type: input.type },
            });
            if (existingGoal)
                throw new Error(`goal Name: ${input.name} is already exist`);
            input.slug = goalSlug;
        }
        await this.repository.updateOne({
            id: id,
            input: input,
        });
        return this.findByPk(id);
    }
    async deleteOne(id) {
        const goalExists = await this.repository.findByPk(id);
        if (!goalExists)
            throw new Error(`goal: ${id} does not exist!`);
        const remove = await this.repository.deleteOne(id);
        if (remove === 0)
            throw new Error(`goal: ${id} does not exist!`);
        return true;
    }
    async findAndCountAll({ offset, limit, query, sort, order, type }) {
        let where = {};
        if (query) {
            where = {
                ...where,
                [Sequelize.Op.or]: helpers_1.SequlizeQueryGenerator.searchRegex({
                    query,
                    columns: ['name', 'type'],
                }),
            };
        }
        if (type) {
            where = { ...where, type: type };
        }
        const currentDate = new Date();
        const result = await this.repository.findAndCountAll({
            where,
            offset,
            limit,
            order: [[order, sort]],
            distinct: true,
        });
        const rowsWithCalculatedFields = result.rows.map((row) => {
            const progressPercentage = (row.currentAmount / row.totalAmount) * 100;
            const goalEndDate = new Date(row.endDate);
            goalEndDate.setHours(0, 0, 0, 0);
            const startDate = new Date(row.startDate);
            startDate.setHours(0, 0, 0, 0);
            const totalDays = Math.ceil((goalEndDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
            let remainingDays = Math.ceil((goalEndDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000));
            remainingDays = (remainingDays < 0) ? remainingDays = 0 : remainingDays;
            const updatedGoal = {
                id: row.id,
                userId: row.userId,
                name: row.name,
                slug: row.slug,
                type: row.type,
                startDate: row.startDate,
                endDate: row.endDate,
                totalAmount: row.totalAmount,
                currentAmount: row.currentAmount,
                remarks: row.remarks,
                remainingDays,
                progressPercentage,
                totalDays,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
            };
            return updatedGoal;
        });
        return {
            count: result.count,
            rows: rowsWithCalculatedFields,
        };
    }
}
exports.GoalService = GoalService;
