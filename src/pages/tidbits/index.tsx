import * as React from "react";
import * as fs from "fs";
import { renderSecondaryPage } from "../../templates/secondary-template";
import matter from "gray-matter";
import { Markdown } from "../../components/Markdown";

export const page = {
  published: false,
  async generateChildren() {
    const files = await fs.promises.readdir(__dirname);
    const filesWithoutIndex = files.filter((file) => file !== "index.tsx");
    const pages = [];
    for (const file of filesWithoutIndex) {
      const contents = await fs.promises.readFile(
        __dirname + "/" + file,
        "utf8"
      );
      const parsed = matter(contents);

      pages.push({
        title: parsed.data.title,
        permalink: "/" + file.split(".")[0],
        published: parsed.data.published,
        tags: parsed.data.tags?.split(",") ?? [],
        renderToHTML() {
          return renderSecondaryPage(
            <Markdown content={parsed.content} />,
            parsed.data.title
          );
        },
      });
    }
    return pages;
  },
};
