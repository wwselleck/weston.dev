import express from "express";
import * as React from "react";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { Config } from "../config";
import { GamesPage } from "../components/GamesPage";
import { HintFlavorsPage } from "../components/HintFlavorsPage";
import { renderSecondaryPage } from "../templates/secondary-template";

interface ListsRouterArgs {
  config: Config;
}

const ListPageRenderers = {
  games: async (worksheet) => {
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
  'hint-flavors': async (worksheet) => {

    const rows = await worksheet.getRows();
    const flavors = rows
      .map(r => {
        return {
          flavor: r.Flavor,
          rating: r.Rating,
          comment: r.Comment,
          image: r.Image
        }
      })
    return <HintFlavorsPage flavors={flavors} />
  }
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
        const elem = await ListPageRenderers[list.id](worksheet)
        res.header("Content-Type", "text/html");
        res.send(renderSecondaryPage(elem));
      })
    }
    return router;
  }
}
