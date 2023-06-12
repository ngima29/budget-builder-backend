"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const schema_1 = require("./graphql/schema");
const middlewares_1 = require("./middlewares");
const instance_1 = require("./models/instance");
const v8 = require('v8');
class Server {
    app;
    constructor() {
        this.app = (0, express_1.default)();
    }
    async connectDB() {
        await instance_1.Database.connection();
    }
    async start() {
        this.connectDB();
        this.configuration();
        const server = new server_1.ApolloServer({
            schema: schema_1.schema,
            introspection: true,
            csrfPrevention: true,
        });
        const { url } = await (0, standalone_1.startStandaloneServer)(server, {
            listen: { port: this.app.get('port') },
            context: async ({ req }) => {
                const token = req.headers.authorization;
                let user;
                if (token) {
                    user = await middlewares_1.Guard.auth(token);
                }
                return {
                    user,
                    token
                };
            },
        });
        console.log(`🚀  Server ready at: ${url}`);
    }
    configuration() {
        this.app.set('port', config_1.port);
    }
}
const server = new Server();
server.start();
