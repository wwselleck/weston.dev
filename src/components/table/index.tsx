import * as React from 'react';
import { Color, getColorStyle} from '../../color';

export const Table: React.FC = ({children}) => {
  return <>{children}</>
}

interface TableRowProps {
  color?: Color;
}

export const TableRow: React.FC<TableRowProps> = ({ children, color }) => {
  return <div className="table-row">
    {color && <div className="table-cell" style={{
      ...getColorStyle(color),
      padding: '0',
      width: '8px'
    }}/>}
    {children}
  </div>

}

export const TableCell: React.FC = ({children}) => {
  return <span className="table-cell">{children}</span>;
}
