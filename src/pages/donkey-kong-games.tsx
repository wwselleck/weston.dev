import * as React from "react";

import { Page } from "../page";
import { Header, Text, HeaderSm } from "../components/Post";

const DonkeyKongGamesPage = () => {
  return (
    <div>
      <Header>Every Donkey Kong game, ranked</Header>
      <Text>Work in progress....</Text>
      <HeaderSm>1. Donkey Kong (Arcade)</HeaderSm>
    </div>
  );
};

export const page: Page = {
  slug: "donkey-kong",
  render: () => <DonkeyKongGamesPage />,
};
