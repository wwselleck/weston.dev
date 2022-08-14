import express from "express";
import * as React from "react";

import { renderHomePage } from "../templates/home-template";
import { IndexPage } from "../components/pages/index";
import { Context} from '../context';

export class IndexRouter {
  static create(context: Context) {
    const router = express.Router();
    router.get("/", async (_, res) => {
      const commit = await context.github.getMostRecentCommit();
      const lists = await context.lists.getLists();

      res.header("Content-Type", "text/html");
      res.send(
        renderHomePage(
          <IndexPage projects={context.data.projects} links={context.data.links} commit={commit} lists={lists} />
        )
      );
    });
    return router;
  }
}
