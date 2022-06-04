import express from "express";
import * as React from 'react';
import { Config } from "../config";
import { WritingService } from '../services/writing';
import { renderSecondaryPage } from '../templates/secondary-template'
import { Markdown } from '../components/Markdown';


interface WritingRouterArgs {
  config: Config;
  writingService: WritingService;
}

export class WritingRouter {
  static async create({ config, writingService }: WritingRouterArgs) {
    const router = express.Router();

    router.get('/:writingId', async (req, res) => {
      const { writingId } = req.params;

      const writing = await writingService.getWriting(writingId);

      res.header("Content-Type", "text/html");
      res.send(renderSecondaryPage(<Markdown content={writing.markdown} />))
    })

    return router;
  }
}
