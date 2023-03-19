import * as React from "react";
import { BestToWorst } from "../BestToWorst";
import { keyify } from "../../../lib/key";
import { renderSecondaryPage } from "../../../templates/secondary-template";

const rankings = [
  {
    name: "Soul of Cinder",
    difficulty: 5,
  },
  {
    name: "Sister Friede",
    difficulty: 5,
  },
  {
    name: "Slave Knight Gael",
    difficulty: 4,
  },
  {
    name: "Abyss Watchers",
    difficulty: 4,
  },
  {
    name: "Pontiff Sulyvahn",
    difficulty: 5,
  },
  {
    name: "Champion Gundyr",
    difficulty: 4,
  },
  {
    name: "Darkeater Midir",
    difficulty: 4,
  },
  {
    name: "Demon Prince",
    difficulty: 5,
  },
  {
    name: "Lothric, Younger Prince",
    difficulty: 3,
  },
  {
    name: "Dancer of the Boreal Valley",
    difficulty: 3,
  },
  {
    name: "Dragonslayer Armour",
    difficulty: 4,
  },
  {
    name: "Aldrich, Devourer of Gods",
    difficulty: 3,
  },
  {
    name: "Nameless King",
    difficulty: 3,
  },
  {
    name: "Vordt of the Boreal Valley",
    difficulty: 2,
  },
  {
    name: "Oceiros, the Consumed King",
    difficulty: 2,
  },
  {
    name: "Old Demon King",
    difficulty: 2,
  },
  {
    name: "Champion's Gravetender & Gravetender Greatwolf",
    difficulty: 3,
  },
  {
    name: "Iudex Gundyr",
    difficulty: 2,
  },
  {
    name: "Curse-Rotted Greatwood",
    difficulty: 2,
  },
  {
    name: "High Lord Wolnir",
    difficulty: 1,
  },
  {
    name: "Ancient Wyvern",
    difficulty: 2,
  },
  {
    name: "Halflight, Spear of the Church",
    difficulty: 2,
  },
  {
    name: "Yhorm the Giant",
    difficulty: 2,
  },
  {
    name: "Crystal Sage",
    difficulty: 1,
  },
  {
    name: "Deacons of the Deep",
    difficulty: 1,
  },
];

export const page = {
  title: "Best To Worst: Dark Souls 3 Bosses",
  published: true,
  renderToHTML() {
    return renderSecondaryPage(
      <div>
        <p className="mb-8">💀 = Difficulty</p>
        <BestToWorst
          items={rankings.map((r) => ({
            primaryText: `${r.name}`,
            secondaryText: "💀".repeat(r.difficulty),
            image: `/public/dark-souls-3/${keyify(r.name)}.webp`,
            //desc: r.desc,
            //image: r.image,
          }))}
          useImageAsBackground={true}
        />
      </div>,
      "Best To Worst: Dark Souls 3 Bosses"
    );
  },
};
