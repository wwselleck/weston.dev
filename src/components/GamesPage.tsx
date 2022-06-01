import * as React from "react";
import { Table, TableRow, TableCell} from './table';

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
      <Table>
        {sortedGames.map((game, i) => {
          const gameCompleted = ['completed', '100'].includes(game.completionStatus);
          return <TableRow>
            <TableCell>
              <div className="games-pos-cell">{i+1}</div>
            </TableCell>
            <TableCell>
              <PlatformImage platform={game.platform} />
            </TableCell>
            <TableCell>
              <div>
                <div>
                  <b>{game.name}</b>
                </div>
                <div className="subtle-text">
                  {game.added.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  })}
                </div>
              </div>
            </TableCell>
            <TableCell align="right">
              {gameCompleted && <Badge image="game-completed_128.png" title="Game completed"/>}
              {game.completionStatus === '100' && <Badge image="game-100_128.png" title="Game completed to 100%"/>}
              {game.ownership === 'physical' && <Badge image="game-owned_128.png" title="Physical copy owned"/>}

            </TableCell>
          </TableRow>
        })}
      </Table>
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

const getPlatformImageUrl = (platform: string) => {
  const file = PlatformImageMap[platform.toLowerCase()]
    return  file
      ? `/public/${file}`
      : null;
}

const PlatformImage: React.FC<{ platform: string}> = ({ platform}) => {
  return <img className="games-platform-image" src={getPlatformImageUrl(platform)}/>
}

const Badge = ({image, title}) => {
  return <img className="games-page-badge" title={title} src={`/public/${image}`}/>
}

