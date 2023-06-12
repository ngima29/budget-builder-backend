"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class TokenGenerator {
    static instance;
    secretKey;
    constructor() {
        this.secretKey = process.env.SECRET_KEY;
    }
    static get() {
        if (!TokenGenerator.instance) {
            TokenGenerator.instance = new TokenGenerator();
        }
        return TokenGenerator.instance;
    }
    generateToken(payload, expiresIn) {
        if (!this.secretKey) {
            throw new Error('Secret key not found');
        }
        const token = jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn });
        return token;
    }
    verifyToken(token) {
        if (!this.secretKey) {
            throw new Error('Secret key not found');
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.secretKey);
            return decoded;
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
}
const tokenGenerator = TokenGenerator.get();
exports.TokenGenerator = tokenGenerator;
