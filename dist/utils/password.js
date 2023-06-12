"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class Password {
    static instance;
    constructor() { }
    static get() {
        if (!Password.instance) {
            Password.instance = new Password();
        }
        return Password.instance;
    }
    async generate(password) {
        const saltRounds = 10; //password hash
        const salt = await bcrypt_1.default.genSalt(saltRounds);
        const hash = await bcrypt_1.default.hash(password, salt);
        return hash;
    }
    async validatePassword(password, hashPassword) {
        const isValid = await bcrypt_1.default.compare(password, hashPassword);
        return isValid;
    }
}
const password = Password.get();
exports.Password = password;
