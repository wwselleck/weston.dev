import * as React from "react";
import { PageWrapper } from "./PageWrapper";

import {
  List,
  ListItem,
  ListItemPosition,
  ListItemIcon ,
  ListItemHeader,
  ListItemSecondaryText
} from './list';

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
      <List items={sortedGames}
        renderItem={(item, i) => {
              return <GamesListItem {...item} num={i + 1} />
        }}/>
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

const Badge = ({image, title}) => {
  return <img className="games-page-badge" title={title} src={`/public/${image}`}/>
}

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
    <ListItem>
      <ListItemPosition position={num}/>
      {img && <ListItemIcon image={img}/>}
      <div>
        <div className="games-page-item-horizontal-wrapper">
          <ListItemHeader text={name} />
          {gameCompleted && <Badge image="game-completed_128.png" title="Game completed"/>}
          {completionStatus === '100' && <Badge image="game-100_128.png" title="Game completed to 100%"/>}
          {ownership === 'physical' && <Badge image="game-owned_128.png" title="Physical copy owned"/>}
        </div>
        <div className="games-page-item-horizontal-wrapper">
          <ListItemSecondaryText text={`
              Added ${added.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          `}/>
          { isNew && <span className="games-list-item-new"><ListItemSecondaryText text="NEW"/></span>
          }
        </div>
      </div>
    </ListItem>
  );
};
