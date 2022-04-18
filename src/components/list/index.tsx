import * as React from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, i: number) => JSX.Element;
  spaceBetween?: string;
}

export const List = <T,>({ items, renderItem, spaceBetween = '12px' }: ListProps<T>) => {
  return <ol className="list">
    {items.map((item, i) => {
      return <li style={{
        marginBottom: spaceBetween
      }}>
        {renderItem(item, i)}
      </li>
    })}
  </ol>
}

export const ListItem = <T,>( { children, spacingVertical }: {
  children: React.ReactNode;
  spacingVertical?: string;
} ) => {
  return <div className="list-item" style={{
    ...(spacingVertical && {marginBottom: spacingVertical})}}>
    {children}
  </div>
}

export const ListItemPosition = ({ position }) => {
  return <span className="list-item-position">{position}</span>
}

export const ListItemIcon = ({ image }) => {
  return <img className="list-item-icon" src={`/public/${image}`} />
}

export const ListItemMainContent = ({primaryEl, secondaryEl}) => {
  return <div>
    <div className="list-item-main-content-primary">
      {primaryEl}
    </div>
    <div className="list-item-main-content-secondary">
      {secondaryEl}
    </div>
  </div>
}

export const ListItemHeader = ({ text }) => {
  return <h1 className="list-item-header">{text}</h1>;
}

export const ListItemSecondaryText = ({text}) => {
  return <div className="list-item-secondary-text">{text}</div>;
}
