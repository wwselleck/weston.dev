import * as React from 'react';
import { Color, getColorStyle } from '../color';
import { Table, TableRow, TableCell} from './table';


const TierHeader = ({ children, color }) => {
  return <div className="w-full rounded-lg flex mb-4 justify-center text-3xl text-white" style={{
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
    {description && <p className="leading-normal mb-8">{description}</p>}
    {tiers.map(tier => {
      return <div className="mb-14">
        <TierHeader color={tier.color}>{tier.tier}</TierHeader>
        <div className="mb-2">{tier.desc}</div>
        <Table>
          {tier.items.map(item => {
            return <TableRow color={tier.color}>
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
          })}
        </Table>
      </div>
    })}
  </div>
}
