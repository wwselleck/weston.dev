import * as fs from 'fs'
import * as path from 'path';
import matter from 'gray-matter';
import { renderMarkdownPage } from '../templates/markdown-template';
import { Context } from '../context';

const PAGES_DIR = path.resolve(__dirname, '../pages');

export interface Page {
  title: string;
  permalink: string;
  tags: string[];
  renderToHTML(context: Context): Promise<string>;
  published: boolean;
}

const PageFactory = {
  async fromMarkdownFile(relativeDirPath: string): Promise<Page | null> {
    const mdFilePath = path.resolve(PAGES_DIR,relativeDirPath, 'index.md');
    if(!fs.existsSync(mdFilePath)) {
      return null;
    }
    const contents =  await fs.promises.readFile(mdFilePath, 'utf8');
    const parsed = matter(contents);
    const permalink = '/' + relativeDirPath;
    return {
      title: parsed.data.title,
      permalink,
      published: parsed.data.published ?? false,
      tags: [],
      async renderToHTML() {
        return renderMarkdownPage(parsed.content, parsed.data.title)
      }
    }
  },
  async fromModule(relativeDirPath: string): Promise<Page|null> {
    const tsxFilePath = path.resolve(PAGES_DIR, relativeDirPath, 'index.tsx');
    if(fs.existsSync(tsxFilePath)) {
      const { page } = require(tsxFilePath);
      const permalink = '/' + relativeDirPath;

      return {
        title: page.title,
        permalink,
        published: page.published ?? false,
        tags: page.tags,
        renderToHTML: page.renderToHTML
      };
    }

  }
}

const findIndexPageForPath = async (relativeDirPath: string): Promise<Page> => {
  const mdPage = await PageFactory.fromMarkdownFile(relativeDirPath);
  if(mdPage) {
    return mdPage;
  }

  const modulePage = await PageFactory.fromModule(relativeDirPath);
  if(modulePage) {
    return modulePage;
  }
}


export class PagesService {
  pages?: Page[];
  constructor() {}

  async getAllPages() {
    if(!this.pages) {
      await this.reloadPages();
    }
    return this.pages;
  }

  private async reloadPages() {
    console.log(`Looking for pages in ${PAGES_DIR}`)
    const subpathsToCheck = [''];
    const pages = [];
    while(subpathsToCheck.length > 0) {
      const subpath = subpathsToCheck.pop();
      const indexPage = await findIndexPageForPath(subpath);
      if(indexPage) {
        if(indexPage.published) {
          console.log(`Page found on path ${subpath}`);
          pages.push(indexPage);
        } else {
          console.log(`Skipping unpublished page found on path ${subpath}`);
        }
      }
      const absolutePath = path.resolve(PAGES_DIR, subpath);
      const files = await fs.promises.readdir(absolutePath);
      for(const file of files) {
        const absoluteFilePath = path.resolve(absolutePath, file);
        if(fs.statSync(absoluteFilePath).isDirectory()) {
          subpathsToCheck.push(path.join(subpath, file));
        }
      }
    }
    this.pages = pages;
  }

}
