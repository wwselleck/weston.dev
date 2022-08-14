import * as React from 'react';
import { getColorStyle } from '../color';
import { List, ListItem } from '../services/lists';
import { Table, TableRow, TableCell} from './table';

const TierHeader = ({ name, color }) => {
  return <div className="mb-2">
    <h1 className="text-3xl">{name}</h1>
    <div className="h-2 w-full max-w-3xl" style={getColorStyle(color)}/>
  </div>;
}

interface TieredListTableProps<ItemType extends ListItem> {
  list: List;
  items: ItemType[];
  renderItem?(item: ItemType): React.ReactNode;
}

const defaultItemRender = <ItemType extends ListItem>(item: ItemType) => {
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

}

export const TieredListTable = <ItemType extends ListItem>({ list, items, renderItem}: TieredListTableProps<ItemType>) => {
  const { tiers } = list;

  const sortedTiers = [...tiers].sort((tier1, tier2) => {
    return tier2.ratingRange[0] - tier1.ratingRange[0]
  });
  const itemsByTier = items.reduce((acc, curr) => {
    const tier = sortedTiers.find(tier => {
      if(curr.rating <= tier.ratingRange[1] && curr.rating >= tier.ratingRange[0]) {
        return tier;
      }
    })
    if(!tier) {
      console.log('No tier available for item');
      console.log(curr);
      return acc;
    }
    if(!acc[tier.name]) {
      acc[tier.name] = [];
    }
    acc[tier.name].push(curr);
    return acc;
  }, {})

  renderItem = renderItem ?? defaultItemRender;

  return <div>
    {sortedTiers.map(tier => {
      const items = itemsByTier[tier.name];
      if(!items ?? items.length === 0 ) {
        return null
      }
      return <div className="mb-14">
        <TierHeader color={tier.color} name={tier.name}/>
        <div className="mb-2">{tier.description}</div>
        <Table>
          {items.map(item => {
            return renderItem(item)
          })}
        </Table>
      </div>
    })}
  </div>
}
