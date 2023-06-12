"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.investmentResolvers = void 0;
const config_1 = require("../../config");
const middlewares_1 = require("../../middlewares");
const validators_1 = require("../../validators");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
exports.investmentResolvers = {
    Mutation: {
        createInvestment: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.createInvestment, args.input);
            args.input.userId = user.id;
            const data = await new services_1.InvestmentService().create(args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Investment  is successfully created.',
                data: data,
            });
        },
        updateInvestment: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.updateInvestment, args.input);
            args.input.userId = user.id;
            const data = await new services_1.InvestmentService().updateOne(args.id, args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Investment  is successfully Updated.',
                data: data,
            });
        },
        deleteInvestment: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            await new services_1.InvestmentService().deleteOne(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'Investment is successfully Deleted.'
            });
        }
    },
    Query: {
        investment: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            const data = await new services_1.InvestmentService().findByPk(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'Investment is successfully Fetched.',
                data: data
            });
        },
        investments: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            let { offset, limit, query, sort, order, type } = args;
            offset = offset && offset > 0 ? offset - 1 : 0;
            limit = limit ? limit : config_1.pgMinLimit;
            limit = Math.min(limit, config_1.pgMaxLimit);
            query = query ? query : undefined;
            order = order ? order : config_1.defaultOrder;
            sort = sort ? sort : config_1.defaultSort;
            type = type ? type : undefined;
            const { count, rows: data } = await new services_1.InvestmentService().findAndCountAll({
                offset,
                limit,
                query,
                sort,
                order,
                type,
            });
            return helpers_1.SuccessResponse.send({
                message: 'Investments  list is successfully fetched.',
                data: data,
                count: count,
            });
        },
    }
};
