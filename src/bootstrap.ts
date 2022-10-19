import "reflect-metadata";
require("express-async-errors");
import { InversifyExpressServer } from "inversify-express-utils";
import * as cors from "cors";
import * as compression from "compression";
import { container } from "./IOC/ioc";
import "./IOC/loader";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";

async function init() {
  initializeServer();
  connectToMongoDb();
}

function initializeServer() {
  let server = new InversifyExpressServer(container);

  server.setConfig((app: express.Application) => {
    app.use(compression());
    app.disable("etag");
    app.use(cors());

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));

    server.setErrorConfig(async (app) => {
      app.use(
        async (err: any, req: Request, res: Response, next: NextFunction) => {
          if (err.code) {
            res.status(err.code).json(err.message);
          } else {
            res.status(500).json(err.message);
          }
          return;
        }
      );
    });
  });

  server.build().listen(process.env.PORT || 3000, () => {
    console.log(`server running at port ${process.env.PORT}`);
  });
}

async function connectToMongoDb(): Promise<void> {
  const mongoURL = process.env.DB_URL;

  try {
    console.log("connecting to MongoDB...");
    await mongoose.connect(mongoURL);

    console.log("connected to MongoDB...");
  } catch (err) {
    console.log(`MongoDB connection error.
                Please make sure DB service is running. ${err}`);

    process.exit();
  }
}

module.exports.init = init;
