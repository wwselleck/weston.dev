import { Config } from '../src/config';
import { ListsService } from '../src/services/lists';
import { GithubService } from '../src/services/github';
import { Data } from '../src/services/data'
import { PagesService } from './services/pages';

export interface Context {
  config: Config;
  lists: ListsService;
  github: GithubService;
  data: Data;
  pages: PagesService;
}
