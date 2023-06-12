"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashFlowResolvers = void 0;
const config_1 = require("../../config");
const middlewares_1 = require("../../middlewares");
const validators_1 = require("../../validators");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
exports.cashFlowResolvers = {
    Mutation: {
        createCashFlow: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.createCashFlow, args.input);
            args.input.userId = user.id;
            const categoryExist = await new services_1.CategoryService().findByPk(args.input.categoryId);
            if (!categoryExist)
                throw new Error(`Category  ${args.input.categoryId} does not exist`);
            if (args.input.type !== categoryExist.type)
                throw new Error(`Category  ${args.input.categoryId} is  ${categoryExist.type} types`);
            const data = await new services_1.CashFlowService().create(args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Transaction  is successfully created.',
                data: data,
            });
        },
        updateCashFlow: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.updateCashFlow, args.input);
            args.input.userId = user.id;
            const categoryExist = await new services_1.CategoryService().findByPk(args.input.categoryId);
            if (!categoryExist)
                throw new Error(`Category  ${args.input.categoryId} does not exist`);
            if (args.input.type !== categoryExist.type)
                throw new Error(`Category  ${args.input.categoryId} is  ${categoryExist.type} types`);
            const data = await new services_1.CashFlowService().updateOne(args.id, args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Transaction  is successfully Updated.',
                data: data,
            });
        },
        deleteCashFlow: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            await new services_1.CashFlowService().deleteOne(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'Transaction is successfully Deleted.'
            });
        }
    },
    Query: {
        cashFlow: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            const data = await new services_1.CashFlowService().findByPk(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'Transaction is successfully Fetched.',
                data: data
            });
        },
        cashFlows: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            let { offset, limit, query, sort, order, type } = args;
            offset = offset && offset > 0 ? offset - 1 : 0;
            limit = limit ? limit : config_1.pgMinLimit;
            limit = Math.min(limit, config_1.pgMaxLimit);
            query = query ? query : undefined;
            order = order ? order : config_1.defaultOrder;
            sort = sort ? sort : config_1.defaultSort;
            type = type ? type : undefined;
            const { count, rows: data } = await new services_1.CashFlowService().findAndCountAll({
                offset,
                limit,
                query,
                sort,
                order,
                type,
            });
            return helpers_1.SuccessResponse.send({
                message: 'Transaction  list is successfully fetched.',
                data: data,
                count: count,
            });
        },
    }
};
