import path = require('path');
import fsCb = require('fs');
import matter from 'gray-matter';
import axios from "axios";
import type { AxiosInstance } from 'axios'
import { Config } from '../config';

const fs = fsCb.promises;

interface Writing {
  title: string;
  publishedAt: Date;
  updatedAt: Date;
  markdown: string;
}

export interface WritingService {
  getWriting(writingId: string): Promise<Writing>;

}


export class WritingLocalService implements WritingService {
  construtor() { }

  async getWriting(writingId: string) {
    const mdFilePath = path.resolve(`../writing/${writingId}.md`)

    const fileContents = await fs.readFile(mdFilePath, 'utf-8');

    const { content } = matter(fileContents);

    return {
      title: writingId,
      publishedAt: new Date(),
      updatedAt: new Date(),
      markdown: content
    }
  }
}


export class WritingRemoteService implements WritingService {
  config: Config;
  client: AxiosInstance;

  constructor(config: Config) {
    this.config = config;
    this.client = axios.create({
      auth: {
        username: config.github.username,
        password: config.github.token
      },
      baseURL: 'https://api.github.com'
    });
  }

  // A writingId is the path to the file w/o the extension
  async getWriting(writingId: string) {
    try {

      const result = await this.client.get(
        `/repos/${this.config.writing.repo}/contents/${writingId}.md`
      )
      return this.fileToWriting(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  private fileToWriting(file: any) {
    let base64Contents = file.content;

    let decodedContents = base64Contents
      ? Buffer.from(base64Contents, 'base64').toString('utf-8')
      : '';

    const { content, data } = matter(decodedContents);

    return {
      title: file.name,
      publishedAt: data.publishedAt,
      updatedAt: new Date(),
      markdown: content
    }
  }

  /*
  async getWritings() {
    try {
      const result = await this.options.githubApi.get(
        `/repos/${this.options.config.writing.repo}/contents`
      )

      const writings = [];
      for (const file of result.data) {
        writings.push(...await this.fetchWritingsForFile(file));
      }

      console.log(writings)
    } catch (e) {
      console.log(e)
    }
  }
  */
}
