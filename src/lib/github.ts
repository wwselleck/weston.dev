import axios from 'axios';
import type { AxiosInstance } from 'axios';

export type GithubApi = AxiosInstance;

export const createGithubApi = (username: string, password: string): GithubApi => {
  return axios.create({
    auth: {
      username,
      password,
    },
    baseURL: 'https://api.github.com'
  });
}
