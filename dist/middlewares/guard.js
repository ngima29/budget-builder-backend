"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
class Guard {
    static instance;
    constructor() { }
    static get() {
        if (!Guard.instance) {
            Guard.instance = new Guard();
        }
        return Guard.instance;
    }
    auth = async (token) => {
        const { userId } = await utils_1.TokenGenerator.verifyToken(token);
        const userExists = await new services_1.UserService().findOne({
            id: userId
        });
        if (!userExists) {
            throw Error('Auth Failed Please Try to login Again');
        }
        return userExists;
    };
    grant = (user) => {
        if (!user)
            throw Error('Auth Failed Please Try to login Again');
        return user;
    };
}
const guard = Guard.get();
exports.Guard = guard;
