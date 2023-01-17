import * as React from 'react';
import * as fs from "fs";
import * as path from "path";
import matter from 'gray-matter';
import express from "express";

import { Context } from "../context";
import { renderSecondaryPage } from "../templates/secondary-template";
import { Markdown } from "../components/Markdown";
import { Page } from "../page";

const getPageForFile = async (filename: string): Promise<Page> => {
  const ext = path.extname(filename);
  if(['.tsx', 'js'].includes(ext)) {
      const mod = require(`../pages/${filename}`);
      return mod.page;
  } else if (ext === '.md') {
    const contents = await fs.promises.readFile(path.resolve(__dirname, `../pages/${filename}`), 'utf8');
    const parsedMd = matter(contents);
    if(!parsedMd.data.slug) {
      throw new Error(`Markdown page ${filename} does not have a slug set`)
    }
    return {
      title: parsedMd.data.title,
      slug: parsedMd.data.slug,
      render: () => {
        return <Markdown content={parsedMd.content}/>
        },
      published: parsedMd.data.published
    }
  }
}

export class PagesRouter {
  static async create(context: Context) {
    const router = express.Router();

    const pageFiles = await fs.promises.readdir(
      path.resolve(__dirname, "..", "pages")
    );

    for (const pageFile of pageFiles) {
      const page = await getPageForFile(pageFile)

      if(!page || !page.published) {
        continue;
      }

      console.log(page);
      router.get(`/${page.slug}`, (req, res) => {
        console.log("here");
        res.header("Content-Type", "text/html");
        res.send(renderSecondaryPage(page.render(), page.title));
      });
    }

    console.log(pageFiles);
    return router;
  }
}
