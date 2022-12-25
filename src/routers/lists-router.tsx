import express from "express";
import * as React from "react";
import {
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { GamesPage } from "../components/GamesPage.new";
import { TieredListPage } from '../components/TieredListPage';
import { renderSecondaryPage } from "../templates/secondary-template";
import { List } from '../services/lists';
import { Context} from '../context';


const GenericListPageRenderers = {
  'tiered': async (list: List, worksheet: GoogleSpreadsheetWorksheet) => {
    const rows = await worksheet.getRows();

    const items = [];
    for(const r of rows) {
      let item = {
          name: r.Name,
          rating: r.Rating,
          comment: r.Comment,
          image: r.Image
      }
      items.push(item);
    }

    return <TieredListPage list={list} items={items}/>
  }
}

const CustomListPageRenderers = {
  games: async (list: List, worksheet: GoogleSpreadsheetWorksheet) => {
    const rows = await worksheet.getRows();
    const games = rows
      .filter((r) => r.Rating)
      .map((r) => {
        return {
          name: r.Title,
          platform: r.Platform,
          rating: Number(r.Rating),
          added: r.Added && new Date(r.Added),
          releaseDate: r.Year,
          completionStatus: r['100%'] === 'y'
            ? '100'
            : r['Completed'] === 'y'
              ? 'completed'
              : 'not-completed',
          ownership: r.Ownership === 'physical'
            ? 'physical'
            : 'unowned'
        } as const;
      });
      return <GamesPage games={games} />
  },
}


const getListPageRenderer = (list: List) => {
  if(list.listType === 'custom') {
    return CustomListPageRenderers[list.id];
  } else {
    return GenericListPageRenderers[list.listType]
  }
}


export class ListsRouter {
  static async create(context: Context) {
    const router = express.Router();

    router.get(`/:listId`, async (req, res) => {
      const listId = req.params.listId;
      const list = await context.lists.getListById(listId);

      if(!list) {
        res.status(404);
        res.send();
        return;

      }

      const listSheet = await context.lists.getListSheet(listId);
      const elem = await getListPageRenderer(list)(list, listSheet)

      if(!elem) {
        res.status(404);
        res.send();
        return;
      }
      res.header("Content-Type", "text/html");
      res.send(renderSecondaryPage(elem, list.title));
    })

    return router;
  }
}
