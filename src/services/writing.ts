import axios from "axios";
import { GithubApi } from '../lib/github';
import { Config } from '../config';
import matter from 'gray-matter';

interface Writing {
  title: string;
  publishedAt: Date;
  updatedAt: Date;
  markdown: string;
}

interface WritingServiceOptions {
  config: Config;
  githubApi: GithubApi;
}

const fileToWriting = (file: any) => {
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

export class WritingService {
  constructor(private options: WritingServiceOptions) {
  }

  // A writingId is the path to the file w/o the extension
  async getWriting(writingId: string) {
    console.log(writingId)
    try {

      const result = await this.options.githubApi.get(
        `/repos/${this.options.config.writing.repo}/contents/${writingId}.md`
      )
      return fileToWriting(result.data)
    } catch (err) {
      console.log(err)
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
