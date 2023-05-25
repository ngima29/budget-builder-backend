import cors, { CorsOptions } from "cors";
import express from "express";
import swaggerUI from 'swagger-ui-express';
import { corsWhitelist, port } from "./config";
import * as errorHandler from './middlewares/errorHandler';
import { ProxyRouter as ProxyRouterUser } from "./routes/v1/user";
import { ProxyRouter as ProxyRouterPublic } from "./routes/v1/public";
import { ProxyRouter as ProxyRouterAdmin } from "./routes/v1/admin";
import { ProxyRouter as ProxyRouterPrivate } from "./routes/v1/private";

import { Database } from './models/instance'
import { optionsSwaggerUI, swaggerSpec } from './utils'
import logger from "./utils/logger";

class Server {
  app: express.Application;
  constructor() {
    this.app = express();
    this.configuration();
  }

  private configuration() {
    this.app.set("port", port);
    this.app.use(cors(this.corsOptions));
    this.app.use(express.json());

    // API Routes
    this.app.use("/auth/public/v1", ProxyRouterPublic.map());
    this.app.use("/auth/api/v1", ProxyRouterUser.map());
    this.app.use("/auth/admin/v1", ProxyRouterAdmin.map());
    this.app.use("/auth/private/v1", ProxyRouterPrivate.map());

    // Swagger
    this.app.get('/auth/swagger.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })
    this.app.use('/auth/swagger', swaggerUI.serve)
    this.app.get(
      '/auth/swagger',
      swaggerUI.setup(swaggerSpec, optionsSwaggerUI)
    )

    //Error Handler
    this.app.use(errorHandler.genericErrorHandler)
    this.app.use(errorHandler.methodNotAllowed)
    this.app.use(errorHandler.notFound)
  }

  private corsOptions: CorsOptions = {
    origin: function (origin, callback) {
      if (!origin || corsWhitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
  };

  private async connectDB() {
    await Database.connection();
  }

  public start() {
    this.connectDB();
    this.app.listen(this.app.get("port"), () =>
      logger.info(`App running on PORT ${this.app.get("port")}`)
    );
  }
}

const server = new Server();
server.start();
