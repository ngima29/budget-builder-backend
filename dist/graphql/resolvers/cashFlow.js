"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashFlowResolvers = void 0;
const config_1 = require("../../config");
const middlewares_1 = require("../../middlewares");
const validators_1 = require("../../validators");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const enums_1 = require("../../enums");
exports.cashFlowResolvers = {
    Mutation: {
        createCashFlow: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.createCashFlow, args.input);
            args.input.userId = user.id;
            const categoryExist = await new services_1.CategoryService().findOne(args.input.category);
            console.log(categoryExist);
            if (!categoryExist)
                throw new Error(`Category  ${args.input.category} does not exist`);
            if (args.input.type !== categoryExist.type)
                throw new Error(`Category  ${args.input.category} is  ${categoryExist.type} types`);
            args.input.category = categoryExist.id;
            const data = await new services_1.CashFlowService().create(args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Category  is successfully created.',
                data: data,
            });
        },
        updateCashFlow: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.updateCashFlow, args.input);
            args.input.userId = user.id;
            const categoryExist = await new services_1.CategoryService().findOne(args.input.category);
            if (!categoryExist)
                throw new Error(`Category  ${args.input.category} does not exist`);
            if (args.input.type !== categoryExist.type)
                throw new Error(`Category  ${args.input.category} is  ${categoryExist.type} types`);
            args.input.category = categoryExist.id;
            const data = await new services_1.CashFlowService().updateOne(args.id, args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Category  is successfully Updated.',
                data: data,
            });
        },
        deleteCashFlow: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            await new services_1.CashFlowService().deleteOne(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'Category is successfully Deleted.'
            });
        }
    },
    Query: {
        cashFlow: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            const data = await new services_1.CashFlowService().findByPk(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'Category is successfully Fetched.',
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
                message: 'Category  list is successfully fetched.',
                data: data,
                count: count,
            });
        },
        cashFlowsCountSummaries: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            const income = await new services_1.CashFlowService().sum({ userId: user.id, type: enums_1.CategoryTypeEnum.income, fromDate: args.fromDate, toDate: args.toDate });
            const expenses = await new services_1.CashFlowService().sum({ userId: user.id, type: enums_1.CategoryTypeEnum.expenses, fromDate: args.fromDate, toDate: args.toDate });
            return helpers_1.SuccessResponse.send({
                message: 'Cash Flow counts is successfully fetched.',
                data: {
                    income: income,
                    expenses: expenses,
                    total: income + expenses
                }
            });
        }
    }
};
