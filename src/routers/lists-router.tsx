import express from "express";
import * as React from "react";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { Config } from "../config";
import { GamesPage } from "../components/GamesPage";
import { TieredListPage } from '../components/TieredListPage';
import { renderSecondaryPage } from "../templates/secondary-template";


const GenericListPageRenderers = {
  'tiered': async (list, worksheet) => {
    const rows = await worksheet.getRows();
    const tiers = list.scale.map(({ tier, color, desc}) => {
      return {
        tier,
        desc,
        color,
        items: []
      }
    })

    for(const r of rows) {
      let item = {
          name: r.Name,
          tier: r.Tier,
          comment: r.Comment,
          image: r.Image
      }
      for(const tier of tiers) {
        if(tier.tier === item.tier) {
          tier.items.push(item);
          break;
        }
      }
    }

    return <TieredListPage tiers={tiers} description={list.description}/>
  }
}

const CustomListPageRenderers = {
  games: async (list, worksheet) => {
    const rows = await worksheet.getRows();
    const games = rows
      .filter((r) => r.Rating)
      .map((r) => {
        return {
          name: r.Title,
          platform: r.Platform,
          rating: Number(r.Rating),
          added: r.Added && new Date(r.Added),
          completionStatus: r['100%'] === 'y'
            ? '100'
            : r['Completed'] === 'y'
              ? 'completed'
              : 'not-completed',
          ownership: r.Ownership === 'physical'
            ? 'physical'
            : 'unowned'
        };
      });
      return <GamesPage games={games} />
  },
}

const getListPageRenderer = (list) => {
  if(list.listType === 'custom') {
    return CustomListPageRenderers[list.id];
  } else {
    return GenericListPageRenderers[list.listType]
  }
}

interface ListsRouterArgs {
  config: Config;
}

export class ListsRouter {
  static async create({ config }: ListsRouterArgs) {
    const router = express.Router();
    if(!config.google.serviceAccount.email) {
      return router;
    }

    for(const list of config.lists) {
      router.get(`/${list.id}`, async (_, res) => {
        const doc = new GoogleSpreadsheet(list.sheetId);
        await doc.useServiceAccountAuth({
          client_email: config.google.serviceAccount.email,
          private_key: config.google.serviceAccount.privateKey,
        });
        await doc.loadInfo();
        const worksheet = doc.sheetsByTitle[list.sheetName];
        const elem = await getListPageRenderer(list)(list, worksheet)
        if(!elem) {
          res.status(404);
          res.send();
          return;
        }
        res.header("Content-Type", "text/html");
        res.send(renderSecondaryPage(elem));
      })
    }
    return router;
  }
}
