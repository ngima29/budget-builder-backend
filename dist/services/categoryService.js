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
exports.CategoryService = void 0;
const Sequelize = __importStar(require("sequelize"));
const slug_1 = __importDefault(require("slug"));
const helpers_1 = require("../helpers");
const repositories_1 = require("../repositories");
class CategoryService {
    repository;
    constructor() {
        this.repository = new repositories_1.CategoryRepository();
    }
    async create(input) {
        console.log(input);
        const categorySlug = (0, slug_1.default)(input.name);
        const existingCategory = await this.repository.findOne({
            where: { slug: categorySlug, type: input.type }
        });
        if (existingCategory)
            throw new Error(`Category name already Exist`);
        input.slug = categorySlug;
        const category = await this.repository.create(input);
        return category;
    }
    async findByPk(id, options = { exclude: ['deletedAt'] }) {
        const categoryExists = await this.repository.findByPk(id);
        if (!categoryExists)
            throw new Error(`category ${id} does not exist`);
        return categoryExists;
    }
    async findOne(name) {
        console.log(name);
        let where = {};
        if (name) {
            const newName = name;
            console.log(newName);
            let slugExist = (0, slug_1.default)(newName);
            console.log(slugExist);
            where = { ...where, slug: slugExist };
        }
        const categoryExist = this.repository.findOne({ where: where });
        if (!categoryExist)
            throw new Error(`Category ${name} does not exist`);
        return categoryExist;
    }
    async updateOne(id, input) {
        const categoryExists = await this.repository.findByPk(id);
        if (!categoryExists)
            throw new Error(`category ${id} does not exist`);
        if (input.name) {
            const categorySlug = (0, slug_1.default)(input.name.toString());
            const existingCategory = await this.repository.findOne({
                where: { slug: categorySlug, type: input.type },
            });
            if (existingCategory)
                throw new Error(`category Name: ${input.name} is already exist`);
            input.slug = categorySlug;
        }
        await this.repository.updateOne({
            id: id,
            input: input,
        });
        return this.findByPk(id);
    }
    async deleteOne(id) {
        const categoryExists = await this.repository.findByPk(id);
        if (!categoryExists)
            throw new Error(`category: ${id} does not exist!`);
        const remove = await this.repository.deleteOne(id);
        if (remove === 0)
            throw new Error(`category: ${id} does not exist!`);
        return true;
    }
    findAndCountAll({ offset, limit, query, sort, order, type }) {
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
        return this.repository.findAndCountAll({
            where,
            offset,
            limit,
            order: [[order, sort]],
            distinct: true,
        });
    }
}
exports.CategoryService = CategoryService;
