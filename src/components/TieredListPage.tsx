import * as React from 'react';
import { Color, getColorStyle } from '../color';
import { Table, TableRow, TableCell} from './table';
import { List, ListItem, Tier } from '../services/lists';


const TierHeader = ({ children, color }) => {
  return <div className="w-full rounded-lg flex mb-4 justify-center text-3xl text-white" style={{
    ...getColorStyle(color)
  }}>
    {children}
  </div>
}

interface TieredListPageProps {
  list: List;
  items: ListItem[];
}

export const TieredListPage  = ({
  list,
  items
}: TieredListPageProps) => {
  const { description, tiers} = list;

  const sortedTiers = [...tiers].sort((tier1, tier2) => {
    return tier2.ratingRange[0] - tier1.ratingRange[0]
  });
  const itemsByTier = items.reduce((acc, curr) => {
    const tier = sortedTiers.find(tier => {
      if(curr.rating <= tier.ratingRange[1] && curr.rating >= tier.ratingRange[0]) {
        if(!acc[tier.name]) {
          acc[tier.name] = [];
        }
        acc[tier.name].push(curr);
      }
    })
  }, {})

  return <div>
    {description && <p className="leading-normal mb-8">{description}</p>}
    {tiers.map(tier => {
      const items = itemsByTier[tier.name];
      return <div className="mb-14">
        <TierHeader color={'black'}>{tier.name}</TierHeader>
        <div className="mb-2">{tier.description}</div>
        <Table>
          {items.map(item => {
            return <TableRow color={{type: 'solid', hue: 'red'}}>
            {item.image &&
              <TableCell>
                <img src={item.image} className="w-7"/>
              </TableCell>
            }
              <TableCell>
                <b>{item.name}</b>
              </TableCell>
              {item.comment && <TableCell align="right">
                <div className="ml-auto max-w-md text-text-subtle">
                  {item.comment}
                </div>
              </TableCell>}
            </TableRow>
          })}
        </Table>
      </div>
    })}
  </div>
}
