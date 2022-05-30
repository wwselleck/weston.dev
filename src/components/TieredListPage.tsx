import * as React from 'react';
import { Color, getColorStyle } from '../color';
import { Table, TableRow, TableCell} from './table';
import { List, ListItem, ListItemHeader, ListItemSecondaryText } from './list'


const TierHeader = ({ children, color }) => {
  return <div className="tier-header" style={{
    ...getColorStyle(color)
  }}>
    {children}
  </div>
}

interface TieredListPageProps {
  description?: string;
  tiers: {
    tier: string;
    desc: string;
    color: Color;
    items: {
      name: string;
      comment: string;
      image: string;
    }[];
  }[]
}

export const TieredListPage  = ({
  description,
  tiers
}: TieredListPageProps) => {
console.log(tiers)
  return <div>
    {description && <p className="secondaryPageDescription">{description}</p>}
    {tiers.map(tier => {
      return <div className="tier">
        <TierHeader color={tier.color}>{tier.tier}</TierHeader>
        <div className="tier-desc">{tier.desc}</div>
        <Table>
          {tier.items.map(item => {
            return <TableRow color={tier.color}>
            {item.image &&
              <TableCell>
                <img src={item.image} className="tier-item-image"/>
              </TableCell>
            }
              <TableCell>
              <b>{item.name}</b>
              </TableCell>
            </TableRow>
          })}
        </Table>
      </div>
    })}
  </div>
}
/*
    <List
      items={tier.items}
      renderItem={(item) => {
        return <ListItem>
          <div>
            <ListItemHeader text ={item.name}/>
            <ListItemSecondaryText text={item.comment} />
          </div>
          {item.image && <img className="scored-list-page-item-image" src={item.image}/>}
        </ListItem>
      }} />
      */
