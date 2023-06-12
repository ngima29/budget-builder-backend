"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalResolvers = void 0;
const config_1 = require("../../config");
const middlewares_1 = require("../../middlewares");
const validators_1 = require("../../validators");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
exports.goalResolvers = {
    Mutation: {
        createGoal: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.createGoal, args.input);
            args.input.userId = user.id;
            const data = await new services_1.GoalService().create(args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Goal is successfully created.',
                data: data,
            });
        },
        updateGoal: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.updateGoal, args.input);
            args.input.userId = user.id;
            const data = await new services_1.GoalService().updateOne(args.id, args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Goal  is successfully Updated.',
                data: data,
            });
        },
        deleteGoal: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            await new services_1.GoalService().deleteOne(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'Goal is successfully Deleted.'
            });
        }
    },
    Query: {
        goal: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            const data = await new services_1.GoalService().findByPk(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'Goal is successfully Fetched.',
                data: data
            });
        },
        goals: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            let { offset, limit, query, sort, order, type } = args;
            offset = offset && offset > 0 ? offset - 1 : 0;
            limit = limit ? limit : config_1.pgMinLimit;
            limit = Math.min(limit, config_1.pgMaxLimit);
            query = query ? query : undefined;
            order = order ? order : config_1.defaultOrder;
            sort = sort ? sort : config_1.defaultSort;
            type = type ? type : undefined;
            const { count, rows: data } = await new services_1.GoalService().findAndCountAll({
                offset,
                limit,
                query,
                sort,
                order,
                type,
            });
            return helpers_1.SuccessResponse.send({
                message: 'Goal  list is successfully fetched.',
                data: data,
                count: count,
            });
        },
    }
};
