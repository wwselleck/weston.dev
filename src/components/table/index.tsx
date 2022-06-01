import * as React from 'react';
import { Color, getColorStyle} from '../../color';
import { classnames} from '../../lib/classnames';

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

interface TableCellProps {
  align?: 'right';
}
export const TableCell: React.FC<TableCellProps> = ({children, align}) => {
  return <span className={classnames('table-cell', align === 'right' && 'align-right')}>{children}</span>;
}
