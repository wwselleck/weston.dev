import axios from "axios";
import type { AxiosInstance } from 'axios'
import { Config } from '../config';

export interface Commit {
    link: string;
    repo: {
      name: string;
      link: string;
    };
    message: string;
    date: Date;
}

export class GithubService {
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

  async getMostRecentCommit(): Promise<Commit> {
    const result = await this.client.get(
      `/users/${this.config.github.username}/events`
    );
    const { data: events } = result;

    for (const event of events) {
      if (event.type === "PushEvent") {
        const { data: commit } = await this.client.get(event.payload.commits[0].url);
        const { data: repo } = await this.client.get(event.repo.url);

        return {
          repo: {
            name: repo.full_name,
            link: repo.html_url,
          },
          date: new Date(event.created_at),
          link: commit.html_url,
          message: commit.commit.message,
        };
      }
    }
  }

}
