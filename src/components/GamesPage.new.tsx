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

interface GameProps {
  num: number;
  game: GamesPageProps['games'][0];
}

const Game = ({ num, game }) => {
  const imageId = game.image ?? game.name.toLowerCase().replace(/([^a-z0-9])+/gi, " ").split(' ').join('-');
  return <div className="flex items-center w-full h-20 relative overflow-hidden rounded-xl bg-[#AAAAAA] z-[-100]">
      <span className="text-4xl text-white w-20 flex items-center justify-center">
        #{num}
      </span>
      <div className="w-32 h-full bg-cover" style={{
        backgroundImage: `url('/public/games/${imageId}.png')`,
      }}/>
      <div className="w-full h-full absolute z-[-10] bg-center" style={{
        backgroundImage: `url('/public/games/${imageId}.png')`,
        backgroundSize: '150%',
        filter: 'blur(70px) saturate(3)'
      }}/>
      <div className="ml-4 flex flex-col text-white">
        <div className="text-3xl">{game.name}</div>
        <div>{[game.releaseDate, game.platform].filter(x => x).join(' • ')}</div>
      </div>
  </div>
}

export const GamesPage = ({ games }: GamesPageProps) => {
  return <div className="relative" > {games.map((game, i) => {
    return <div className="mb-4"><Game num={i+1} game={game} /></div>
  })} </div>;
}
