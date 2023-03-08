import path from "path";
import express from "express";
import expressPino from "express-pino-logger";

import * as Data from "./services/data";
import { ListsService } from "./services/lists";
import { GithubService } from "./services/github";
import * as Config from "./config";
import { Context } from "./context";
import { ListsRouter } from "./routers/lists-router";
import { PagesService } from "./services/pages";

export async function start() {
  const config = await Config.load();

  const context: Context = {
    config: config,
    lists: new ListsService(config),
    github: new GithubService(config),
    data: await Data.load(),
    pages: new PagesService
  };

  const app = express();
  app.use(expressPino());
  app.use("/public", express.static(path.join(".", "public")));

  const pages = await context.pages.getAllPages();
  pages.forEach((page) => {
    console.log('Creating GET route for ', page.permalink);
    app.get(page.permalink, async (req, res) => {
      res.header("Content-Type", "text/html");
      res.send(await page.renderToHTML(context));
    })
  })


  app.use("/lists", await ListsRouter.create(context));



  app.listen(8080);
  console.log("Running on port 8080");
}
