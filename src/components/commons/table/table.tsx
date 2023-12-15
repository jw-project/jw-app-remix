import { createContext, useContext, type Context } from 'react';

import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type Table as ReactTableType,
  type Row,
} from '@tanstack/react-table';

import type { ButtonGroupProps } from '../button-group';
import { EmptyState } from '../empty-state';
import { TableButtonGroup } from './table-button-group';
import { TableComponent } from './table-component';

type ClearedButtonGroupProps = Omit<ButtonGroupProps, 'disabled' | 'onClick'>;

type ExtraButtonGroupProps<Data extends object> = {
  enabledWhen?: EnabledWhen;
  shouldUnselect?: boolean;
  onClick?: (data: Array<Data>) => void;
};

type TableContextProps<Data extends object> = {
  table: ReactTableType<Data>;
  onLineAction: (data: Row<Data>) => void;
  buttons?: Array<ClearedButtonGroupProps & ExtraButtonGroupProps<Data>>;
};

export const TableContext = createContext<TableContextProps<object>>({
  table: {} as ReactTableType<object>,
  onLineAction: () => {},
});

type EnabledWhen = 'onlyOneSelected' | 'leastOneSelected' | 'always';

function TableProvider<Data extends object>({
  columns,
  data,
  buttons,
  onLineAction,
}: {
  columns: ColumnDef<Data, any>[];
  data: Data[];
  buttons?: Array<ClearedButtonGroupProps & ExtraButtonGroupProps<Data>>;
  onLineAction?: (data: Row<Data>) => void;
}) {
  const table = useReactTable<Data>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContext.Provider
      value={
        { table, buttons, onLineAction } as unknown as TableContextProps<object>
      }
    >
      {!Boolean(data.length) && <EmptyState />}
      {Boolean(data.length) && (
        <div className="shadow-md rounded-md pb-2">
          <TableButtonGroup />
          <TableComponent />
        </div>
      )}
    </TableContext.Provider>
  );
}

export const useTableContext = <Data extends object>() =>
  useContext<TableContextProps<Data>>(
    TableContext as unknown as Context<TableContextProps<Data>>,
  );

export const Table = TableProvider;
