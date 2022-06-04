import path from "path";
import express from "express";
import expressPino from "express-pino-logger";

import { createGithubApi } from './lib/github'
import * as Data from "./services/data";
import { WritingService } from "./services/writing";
import * as Config from "./config";
import { IndexRouter } from "./routers/index-router";
import { ListsRouter } from "./routers/lists-router";
import { WritingRouter } from "./routers/writing-router";

export async function start() {
  const data = await Data.load();
  const config = await Config.load();

  const githubApi = createGithubApi(
    config.github.username,
    config.github.token
  )

  const app = express();
  app.use(expressPino());
  app.use("/public", express.static(path.join(".", "public")));

  app.use("", IndexRouter.create({ data, config, githubApi }));

  app.use('/lists', await ListsRouter.create({ config }))

  app.use('/writing', await WritingRouter.create({
    config,
    writingService: new WritingService({ config, githubApi })
  }))


  app.listen(8080);
  console.log("Running on port 8080");
}
