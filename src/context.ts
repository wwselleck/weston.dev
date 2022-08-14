import { Config } from '../src/config';
import { ListsService } from '../src/services/lists';
import { GithubService } from '../src/services/github';
import { WritingService } from '../src/services/writing';
import { Data } from '../src/services/data'

export interface Context {
  config: Config;
  lists: ListsService;
  github: GithubService;
  writing: WritingService;
  data: Data;
}
