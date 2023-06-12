"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSort = exports.defaultOrder = exports.pgMaxLimit = exports.pgMinLimit = exports.corsWhitelist = exports.serviceName = exports.tokenExpireTime = exports.headerUserKey = exports.hostUrl = exports.db = exports.jwtAccessTokenExpiryTime = exports.jwtSecret = exports.logLevel = exports.logDir = exports.environment = exports.appName = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const enums_1 = require("../enums");
dotenv_1.default.config();
/**
 * Your favorite port
 */
exports.port = parseInt(process.env.PORT), 
/**
 * Application name
 */
exports.appName = process.env.APP_NAME, 
/**
 * Application mode (Set the environment to 'development' by default)
 */
exports.environment = process.env.ENVIRONMENT, 
/**
 * Log Directive
 */
exports.logDir = process.env.LOG_DIR, 
/**
 * Log Level
 */
exports.logLevel = process.env.LOG_LEVEL, exports.jwtSecret = process.env.JWT_SECRET, exports.jwtAccessTokenExpiryTime = process.env.ACCESS_TOKEN_EXPIRY_TIME, 
/**
 * Database credentials
 */
exports.db = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: parseInt(process.env.DB_PORT),
    logging: false,
    timezone: 'utc',
}, 
/**
 * HOST URL
 */
exports.hostUrl = process.env.HOST_URL, exports.headerUserKey = process.env.HEADER_USER_KEY, exports.tokenExpireTime = 4, exports.serviceName = process.env.SERVICE_NAME, 
/**
 * Allowed Origins
 */
exports.corsWhitelist = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    exports.hostUrl,
], 
/** Pagination */
exports.pgMinLimit = 10, exports.pgMaxLimit = 100, 
/** Order */
exports.defaultOrder = 'updatedAt', exports.defaultSort = enums_1.SortEnum.desc;
