"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
class UserService {
    repository;
    constructor() {
        this.repository = new repositories_1.UserRepository();
    }
    async create(input) {
        const existingUser = await this.repository.findOne({
            where: { email: input.email },
        });
        if (existingUser)
            throw new Error(` Email  : ${input.email} already exist!`);
        if (input.password) {
            input.password = await utils_1.Password.generate(input.password);
        }
        const user = await this.repository.create(input);
        return user;
    }
    async findByPk(id, options = { exclude: ['deletedAt'] }) {
        const userExists = await this.repository.findByPk(id);
        if (!userExists)
            throw new Error(`User ${id}  does not exit `);
        return userExists;
    }
    async updateOne(id, input) {
        if (id) {
            const userExists = await this.repository.findByPk(id);
            if (!userExists)
                throw new Error(`User ${id}  does not exit `);
        }
        if (input.email) {
            const emailExists = await this.repository.findOne({
                where: { email: input.email?.trim() },
            });
            if (emailExists && emailExists.id !== id)
                throw new Error(`Email: ${input.email} is already exists!`);
        }
        await this.repository.updateOne({
            id: id,
            input: input,
        });
        return this.findByPk(id);
    }
    async deleteOne(id) {
        const userExists = await this.repository.findByPk(id);
        if (!userExists)
            throw new Error(`User: ${id} does not exist`);
        const remove = await this.repository.deleteOne(id);
        if (remove === 0)
            throw new Error(`User: ${id} does not exist`);
        return true;
    }
    async login(input) {
        const user = await this.repository.findOne({
            where: { email: input.email }
        });
        if (!user)
            throw new Error('Invalid Identifier or Password');
        const validatePassword = await utils_1.Password.validatePassword(input.password, user.password);
        if (!validatePassword)
            throw new Error('Invalid Identifier or Password');
        if (user && validatePassword) {
            const userId = user.id;
            const token = await utils_1.TokenGenerator.generateToken({ userId }, 86400);
            return {
                user,
                token
            };
        }
    }
    findOne({ email, id }) {
        let where = {};
        if (email) {
            where = { ...where, email: email };
        }
        if (id) {
            where = { id: id };
        }
        return this.repository.findOne({ where });
    }
}
exports.UserService = UserService;
