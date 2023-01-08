import * as fs from "fs";
import * as path from "path";
import express from "express";

import { Context } from "../context";
import { renderSecondaryPage } from "../templates/secondary-template";

export class PagesRouter {
  static async create(context: Context) {
    const router = express.Router();

    const pageFiles = await fs.promises.readdir(
      path.resolve(__dirname, "..", "pages")
    );

    for (const pageFile of pageFiles) {
      console.log(pageFile);
      const mod = require(`../pages/${pageFile}`);
      const page = mod.page;
      console.log();
      router.get(`/${page.slug}`, (req, res) => {
        console.log("here");
        res.header("Content-Type", "text/html");
        res.send(renderSecondaryPage(page.render()));
      });
    }

    console.log(pageFiles);
    return router;
  }
}
