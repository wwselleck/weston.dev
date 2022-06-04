import express from "express";
import * as React from "react";

import { GithubApi } from '../lib/github';
import { renderHomePage } from "../templates/home-template";
import { IndexPage } from "../components/pages/index";
import * as Github from "../services/github";
import { Config } from "../config";
import { Data } from "../services/data";

interface IndexRouterArgs {
  config: Config;
  data: Data;
  githubApi: GithubApi
}

export class IndexRouter {
  static create({ data: { projects, links }, config, githubApi }: IndexRouterArgs) {
    const router = express.Router();
    router.get("/", async (_, res) => {
      const commit = await Github.getMostRecentCommit(
        githubApi,
        config.github.username,
      );
      res.header("Content-Type", "text/html");
      res.send(
        renderHomePage(
          <IndexPage projects={projects} links={links} commit={commit} lists={config.lists} />
        )
      );
    });
    return router;
  }
}
