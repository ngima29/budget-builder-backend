"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryResolvers = void 0;
const config_1 = require("../../config");
const middlewares_1 = require("../../middlewares");
const validators_1 = require("../../validators");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
exports.categoryResolvers = {
    Mutation: {
        createCategory: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.createCategory, args.input);
            args.input.userId = user.id;
            const data = await new services_1.CategoryService().create(args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Category  is successfully created.',
                data: data,
            });
        },
        updateCategory: async (parent, args, contextValue, info) => {
            const user = middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.updateCategory, args.input);
            args.input.userId = user.id;
            const data = await new services_1.CategoryService().updateOne(args.id, args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Category  is successfully Updated.',
                data: data,
            });
        },
        deleteCategory: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            await new services_1.CategoryService().deleteOne(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'Category is successfully Deleted.'
            });
        }
    },
    Query: {
        category: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            const data = await new services_1.CategoryService().findByPk(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'Category is successfully Fetched.',
                data: data
            });
        },
        categories: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            let { offset, limit, query, sort, order, type } = args;
            offset = offset && offset > 0 ? offset - 1 : 0;
            limit = limit ? limit : config_1.pgMinLimit;
            limit = Math.min(limit, config_1.pgMaxLimit);
            query = query ? query : undefined;
            order = order ? order : config_1.defaultOrder;
            sort = sort ? sort : config_1.defaultSort;
            type = type ? type : undefined;
            const { count, rows: data } = await new services_1.CategoryService().findAndCountAll({
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
    }
};
