import * as React from 'react';
import { List, ListItem, ListItemHeader, ListItemSecondaryText } from './list'

interface ScoredListPageProps {
  description?: string;
  scale: number;
  items: {
    name: string;
    score: number;
    image: string;
    comment?: string;
  }[]
}

const ratingToColor = {
  5: '#4943F5',
  4: '#6746E6',
  3: '#934AD0',
  2: '#C04EBA',
  1: '#EC52A4'
}

const Rating = ({ rating }) => {

  return <span
    className="scored-list-page-rating"
    style ={{
      color: ratingToColor[rating]
    }}
  >
    {rating}
    <span className="scored-list-page-rating-scale">/5</span>
  </span>
}

export const ScoredListPage  = ({
  description,
  items
}: ScoredListPageProps) => {
  return <div>
    {description && <p>{description}</p>}
    <List
      items={items}
      renderItem={(item) => {
        return <ListItem>
          <Rating rating={item.score}/>
          <div>
            <ListItemHeader text ={item.name}/>
            <ListItemSecondaryText text={item.comment} />
          </div>
          {item.image && <img className="scored-list-page-item-image" src={item.image}/>}
        </ListItem>
      }} />
  </div>
}
