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
  return <div className="flex p-1 items-center rounded-lg border border-solid my-1 border-[#D3D3D3] overflow-hidden">
    {color && <div className="flex p-1 items-center" style={{
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
  return <div className={classnames('flex flex-shrink-0 p-1 items-center', align === 'right' && 'ml-auto')}>{children}</div>;
}
