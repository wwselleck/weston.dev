import * as React from "react";
import {
  List,
  ListItem,
  ListItemPosition,
  ListItemIcon ,
  ListItemHeader,
  ListItemSecondaryText
} from './list';

const ratingToColor = {
  5: '#4943F5',
  4: '#6746E6',
  3: '#934AD0',
  2: '#C04EBA',
  1: '#EC52A4'
}

const Rating = ({ rating }) => {

  return <span
    className="hint-page-rating"
    style ={{
      color: ratingToColor[rating]
    }}
  >
    {rating}
    <span className="hint-page-rating-scale">/5</span>
  </span>
}

interface HintFlavorsPageProps {
  flavors: {
    flavor: string;
    rating: number;
    comment?: string;
    image?: string;
  }[];
}

export const HintFlavorsPage = ({ flavors } :HintFlavorsPageProps) => {
  return <div>
    <p>
      I love Hint Water and I want everyone to know it. Here is the definitive
      and indisuptable rating for every flavor that I have tried.
    </p>
    <List
      spaceBetween="6px"
      items={flavors}
      renderItem={(item) => {
        return <ListItem >
          <Rating rating={item.rating}/>
          <ListItemHeader text ={item.flavor}/>
          {item.image && <img className="hint-page-item-image" src={item.image}/>}
        </ListItem>
      }}
    />
  </div>
}
