export interface Tier {
  name: string;
  ratingRange: [number, number];
  description: string;
}
export interface List {
  id: string;
  title: string;
  sheetName: string;
  description: string;
  tiers: Tier[];
}
export interface ListItem {
  name: string;
  rating: number;
  comment?: string;
  image?: string;
}
