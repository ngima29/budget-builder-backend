"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const middlewares_1 = require("../../middlewares");
const validators_1 = require("../../validators");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
exports.userResolvers = {
    Mutation: {
        createUser: async (parent, args, contextValue, info) => {
            middlewares_1.Validator.check(validators_1.signUp, args.input);
            const data = await new services_1.UserService().create(args.input);
            return helpers_1.SuccessResponse.send({
                message: 'User  is successfully created.',
                data: data,
            });
        },
        login: async (parent, args, contextValue, info) => {
            middlewares_1.Validator.check(validators_1.login, args.input);
            const data = await new services_1.UserService().login(args.input);
            return helpers_1.SuccessResponse.send({
                message: 'Successfully Login.',
                data: data,
            });
        },
        updateUser: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            middlewares_1.Validator.check(validators_1.updateUser, args.input);
            const data = await new services_1.UserService().updateOne(args.id, args.input);
            return helpers_1.SuccessResponse.send({
                message: 'User  is successfully Updated.',
                data: data,
            });
        },
        deleteUser: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            await new services_1.UserService().deleteOne(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'User is successfully Deleted.'
            });
        }
    },
    Query: {
        user: async (parent, args, contextValue, info) => {
            middlewares_1.Guard.grant(contextValue.user);
            const data = await new services_1.UserService().findByPk(args.id);
            return helpers_1.SuccessResponse.send({
                message: 'User is successfully Fetched.',
                data: data
            });
        }
    }
};
