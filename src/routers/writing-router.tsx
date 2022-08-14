import express from "express";
import * as React from 'react';
import { renderSecondaryPage } from '../templates/secondary-template'
import { Markdown } from '../components/Markdown';
import { Context} from '../context';


export class WritingRouter {
  static async create(context: Context) {
    const router = express.Router();

    router.get('/:writingId', async (req, res) => {
      const { writingId } = req.params;

      const writing = await context.writing.getWriting(writingId);

      res.header("Content-Type", "text/html");
      res.send(renderSecondaryPage(<Markdown content={writing.markdown} />))
    })

    return router;
  }
}
