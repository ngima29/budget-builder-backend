"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanResolvers = void 0;
const config_1 = require("../../config");
const middlewares_1 = require("../../middlewares");
const validators_1 = require("../../validators");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
exports.loanResolvers = {
    Mutation: {
        createLoan: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.createLoan, args.input);
            args.input.userId = user.id;
            const data = await new services_1.LoanService().create(args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Loan  is successfully created.',
                data: data,
            });
        },
        updateLoan: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.updateLoan, args.input);
            args.input.userId = user.id;
            const data = await new services_1.LoanService().updateOne(args.id, args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Loan  is successfully Updated.',
                data: data,
            });
        },
        deleteLoan: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            await new services_1.LoanService().deleteOne(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'Loan is successfully Deleted.'
            });
        }
    },
    Query: {
        loan: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            const data = await new services_1.LoanService().findByPk(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'Loan is successfully Fetched.',
                data: data
            });
        },
        loans: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            let { offset, limit, query, sort, order, type, status } = args;
            offset = offset && offset > 0 ? offset - 1 : 0;
            limit = limit ? limit : config_1.pgMinLimit;
            limit = Math.min(limit, config_1.pgMaxLimit);
            query = query ? query : undefined;
            order = order ? order : config_1.defaultOrder;
            sort = sort ? sort : config_1.defaultSort;
            type = type ? type : undefined;
            status = status ? status : undefined;
            const { count, rows: data } = await new services_1.LoanService().findAndCountAll({
                offset,
                limit,
                query,
                sort,
                order,
                type,
                status,
            });
            return helpers_1.SuccessResponse.send({
                message: 'Loan  list is successfully fetched.',
                data: data,
                count: count,
            });
        },
    }
};
