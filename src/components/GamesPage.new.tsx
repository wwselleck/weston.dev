import * as React from 'react';

interface GamesPageProps {
  games: {
    name: string;
    platform: string;
    rating: number;
    releaseDate: string;
    added?: Date | null;
    completionStatus: '100' | 'completed' | 'not-completed'
    ownership: 'physical' | 'unowned';
  }[];
}

const platformDisplayText = new Map([
  ['switch', "Nintendo Switch"],
  ['gb', 'Gameboy'],
  ['gba', 'Gameboy Advance'],
  ['n64', "Nintendo 64"],
])

const getPlatformDisplayText = (platform: string) => {
  if(platformDisplayText.has(platform.toLowerCase())) {
    return platformDisplayText.get(platform.toLowerCase());
  }
  return platform;
}

interface GameProps {
  num: number;
  game: GamesPageProps['games'][0];
}

const Game = ({ num, game }) => {
  const imageId = game.image ?? game.name.toLowerCase().replace(/([^a-z0-9])+/gi, " ").trim().split(' ').join('-');
  return <div className="flex items-center w-full h-16 relative overflow-hidden rounded-xl bg-[#AAAAAA] z-[-100]">
      <span className="text-4xl text-white w-20 flex items-center justify-center">
        #{num}
      </span>
      <div className="w-24 h-full bg-cover bg-center" style={{
        backgroundImage: `url('/public/games/${imageId}.png')`,
      }}/>
      <div className="w-full h-full absolute z-[-10] bg-center" style={{
        backgroundImage: `url('/public/games/${imageId}.png')`,
        backgroundSize: '150%',
        filter: 'blur(70px) saturate(3)'
      }}/>
      <div className="ml-4 flex flex-col text-white">
        <div className="text-2xl">{game.name}</div>
        <div>{[game.releaseDate, getPlatformDisplayText(game.platform)].filter(x => x).join(' • ')}</div>
      </div>
  </div>
}

export const GamesPage = ({ games }: GamesPageProps) => {
  return <div className="relative grid gap-2 max-w-[900px] mx-auto"> {games.map((game, i) => {
    return <Game num={i+1} game={game} />
  })} </div>;
}
