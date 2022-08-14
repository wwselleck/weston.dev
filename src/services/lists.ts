import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { Config} from '../config';

export interface Tier {
  name: string;
  ratingRange: [number, number];
  description: string;
  color: string;
}
export interface List {
  id: string;
  listType: 'custom' | 'tiered';
  title: string;
  sheetName: string;
  description?: string;
  tiers: Tier[];
  ordered: boolean;
}
export interface ListItem {
  name: string;
  rating: number;
  comment?: string;
  image?: string;
}

export class ListsService {
  config: Config;
  doc: GoogleSpreadsheet;
  constructor(config: Config) {
    this.config = config;
    this.doc = new GoogleSpreadsheet(this.config.lists.sheetId);
  }

  private async getDoc() {
    await this.doc.useServiceAccountAuth({
      client_email: this.config.google.serviceAccount.email,
      private_key: this.config.google.serviceAccount.privateKey,
    });
    await this.doc.loadInfo();
    return this.doc;
  }

  async getLists(): Promise<List[]> {
    const doc = await this.getDoc();
    const infoSheet = doc.sheetsByTitle[this.config.lists.infoSheetName];
    return getListsFromInfoSheet(infoSheet);
  }

  async getListById(listId: string): Promise<List> {
     const lists = await this.getLists();
     return lists.find(list => list.id === listId);
  }

  async getListSheet(listId: string) {
    const list = await this.getListById(listId);
    const doc = await this.getDoc();
    return doc.sheetsByTitle[list.sheetName];
  }
}

export const getListsFromInfoSheet = async (sheet: GoogleSpreadsheetWorksheet): Promise<List[]> => {
  const rows = await sheet.getRows();
  return rows.map(r => {
    const tiers = r.tiers.split('\n').map(tierStr => {
      const [tierName, tierRangeStart, tierRangeEnd, color, description] = tierStr.split('+')
      return {
      name: tierName,
      ratingRange: [tierRangeStart, tierRangeEnd],
      color,
      description
      }
    });
    return {
      id: r.id,
      listType: r.type,
      title: r.title,
      sheetName: r['sheet-name'],
      tiers,
      ordered: true
    }
  })
}
