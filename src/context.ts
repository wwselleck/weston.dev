import { Config } from "../src/config";
import { GithubService } from "../src/services/github";
import { Data } from "../src/services/data";
import { PagesService } from "./services/pages";

export interface Context {
  config: Config;
  github: GithubService;
  data: Data;
  pages: PagesService;
}
