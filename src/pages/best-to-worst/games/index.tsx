import * as React from "react";
import { Page } from "../../../services/pages";
import { Config } from "../../../config";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { GamesPage } from "../../../components/GamesPage";
import { renderSecondaryPage } from "../../../templates/secondary-template";
import { Context } from "../../../context";

let worksheet;

const getWorksheet = async (config: Config) => {
  if (worksheet) {
    return worksheet;
  }

  let doc = new GoogleSpreadsheet(config.lists.sheetId);
  await doc.useServiceAccountAuth({
    client_email: config.google.serviceAccount.email,
    private_key: config.google.serviceAccount.privateKey,
  });
  await doc.loadInfo();
  worksheet = doc.sheetsByTitle["Games"];
  return worksheet;
};

export const page = {
  title: "Best To Worst: Video Games",
  published: true,
  async renderToHTML(context: Context) {
    const worksheet = await getWorksheet(context.config);
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
          completionStatus:
            r["100%"] === "y"
              ? "100"
              : r["Completed"] === "y"
              ? "completed"
              : "not-completed",
          ownership: r.Ownership === "physical" ? "physical" : "unowned",
        } as const;
      });
    return renderSecondaryPage(<GamesPage games={games} />);
  },
};
