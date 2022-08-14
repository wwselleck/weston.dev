import * as React from 'react';
import { List, ListItem } from '../services/lists';
import { TieredListTable} from './TieredListTable';


interface TieredListPageProps {
  list: List;
  items: ListItem[];
}

export const TieredListPage  = ({
  list,
  items
}: TieredListPageProps) => {
  const { title, description } = list;

  return <div>

    <h1 className="text-4xl mb-7">{title} List</h1>
    {description && <p className="leading-normal mb-8">{description}</p>}
    <TieredListTable list={list} items={items}/>
  </div>
}
