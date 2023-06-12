"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const config_1 = require("../config");
class Database {
    sequelize;
    static instance;
    dialect;
    dbname;
    username;
    password;
    host;
    port;
    maxPool;
    minPool;
    constructor() {
        this.dialect = config_1.db.dialect;
        this.dbname = config_1.db.name;
        this.username = config_1.db.username;
        this.password = config_1.db.password;
        this.host = config_1.db.host;
        this.port = config_1.db.port;
        this.maxPool = 10;
        this.minPool = 1;
        this.sequelize = new sequelize_1.default.Sequelize(this.dbname, this.username, this.password, {
            host: this.host,
            dialect: this.dialect,
            dialectOptions: {
                encrypt: true,
            },
            port: this.port,
            logging: false,
            timezone: 'utc',
            pool: {
                max: this.maxPool,
                min: this.minPool,
                acquire: 30000,
                idle: 10000,
            },
            define: {
                timestamps: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    static get() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    async connection() {
        try {
            await this.sequelize.authenticate();
            console.log(`${config_1.db.dialect} is database connected`);
        }
        catch (error) {
            console.log(error.message);
            throw Error(error.message);
        }
    }
}
const database = Database.get();
exports.Database = database;
