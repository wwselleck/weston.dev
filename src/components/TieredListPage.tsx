import * as React from 'react';
import { Color, getColorStyle } from '../color';
import { List, ListItem, ListItemHeader, ListItemSecondaryText } from './list'


const TierIcon = ({ children, color }) => {
  return <div className="tier-icon" style={{
    ...getColorStyle(color)
  }}>
    {children}
  </div>
}

interface TieredListPageProps {
  description?: string;
  tiers: {
    tier: string;
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
      return <div>
        <TierIcon color={tier.color}>{tier.tier}</TierIcon>
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
      </div>
    })}
  </div>
}
/*
      */
