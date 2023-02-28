import path from "path";
import express from "express";
import expressPino from "express-pino-logger";

import * as Data from "./services/data";
import { ListsService } from "./services/lists";
import { GithubService } from "./services/github";
import * as Config from "./config";
import { Context } from "./context";
import { IndexRouter } from "./routers/index-router";
import { ListsRouter } from "./routers/lists-router";
import { PagesRouter } from "./routers/pages-router";

export async function start() {
  const config = await Config.load();

  const context: Context = {
    config: config,
    lists: new ListsService(config),
    github: new GithubService(config),
    data: await Data.load(),
  };

  const app = express();
  app.use(expressPino());
  app.use("/public", express.static(path.join(".", "public")));

  app.use("", IndexRouter.create(context));

  app.use("/lists", await ListsRouter.create(context));


  app.use("", await PagesRouter.create(context));

  app.listen(8080);
  console.log("Running on port 8080");
}
