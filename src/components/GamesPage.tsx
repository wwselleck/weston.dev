import * as React from "react";
import { PageWrapper } from "./PageWrapper";

interface GamesPageProps {
  games: {
    name: string;
    platform: string;
    rating: number;
    added?: Date | null;
    completionStatus: '100' | 'completed' | 'not-completed'
    ownership: 'physical' | 'unowned';
  }[];
}

export const GamesPage = ({ games }: GamesPageProps) => {
  const sortedGames = [...games].sort((g1, g2) => {
    return g2.rating - g1.rating;
  });
  return (
    <div className="gamesPage">
      <p>
        All of the games I've ever (thoroughly) played in order from 1-
        {games.length}
      </p>
      <ol className="gamesList">
        {sortedGames.map((game, i) => {
          return (
            <li>
              <GamesListItem {...game} num={i + 1} />
            </li>
          );
        })}
      </ol>
    </div>
  );
};

const PlatformImageMap = {
  n64: "n64.png",
  pc: "pc.png",
  switch: "switch.png",
  "xbox 360": "xbox360.png",
  gb: "gameboy.png",
  wii: "wii.png",
  gamecube: "gamecube.png",
  gba: "gba.png",
  ds: "ds.png",
  nes: "nes.png",
  flash: "flash.png",
  famicom: "famicom.png",
  snes: "snes.jpg",
};

interface GamesListItemProps {
  name: string;
  platform: string;
  num: number;
  added?: Date | null;
  completionStatus: '100' | 'completed' | 'not-completed'
  ownership: 'physical' | 'unowned';
}
const msInDay = 1000 * 60* 60 * 24;
const GamesListItem = ({ name, platform, num, added, completionStatus, ownership }: GamesListItemProps) => {
  const img = PlatformImageMap[platform.toLowerCase()];
  const isNew = added && (new Date().getTime()) - added.getTime() < (msInDay * 7);

  const gameCompleted = ['completed', '100'].includes(completionStatus);

  return (
    <div className="gamesListItem">
      <span className="gamesListItemPosition">{num}</span>
      {img && <img src={`public/${img}`} />}
      <div>
        <div className="gamesListItemName">
          <span>{name}</span>
          {gameCompleted && <img src="public/game-completed_128.png" title="Game completed"/>}
          {completionStatus === '100' && <img src="public/game-100_128.png" title="Game completed to 100%"/>}
          {ownership === 'physical' && <img src="public/game-owned_128.png" title="Physical copy owned"/>}
        </div>
        {added && (
          <div className="gamesListItemDetails">
            Added{" "}
            {added.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <span className="gamesListItemNew">{isNew && " NEW!"}</span>
          </div>
        )}
      </div>
    </div>
  );
};
