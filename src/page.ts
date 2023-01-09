export interface Page {
  title: string;
  slug: string;
  render(): React.ReactNode;
}
