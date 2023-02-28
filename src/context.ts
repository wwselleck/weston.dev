import { Config } from '../src/config';
import { ListsService } from '../src/services/lists';
import { GithubService } from '../src/services/github';
import { Data } from '../src/services/data'

export interface Context {
  config: Config;
  lists: ListsService;
  github: GithubService;
  data: Data;
}
