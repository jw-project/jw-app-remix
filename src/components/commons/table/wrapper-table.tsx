import { type ColumnDef } from '@tanstack/react-table';

import { ButtonGroup, type ButtonGroupProps } from '../button-group';
import { Table } from './table';

export function WrapperTable<Data extends object>({
  data,
  columns,
  buttons,
}: {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  buttons?: ButtonGroupProps;
}) {
  return (
    <div className="shadow-md rounded-md">
      <div className="p-4 flex items-center justify-between pb-4 bg-white dark:bg-gray-900 rounded-t-md">
        {buttons && <ButtonGroup buttons={buttons} />}
      </div>
      <Table data={data} columns={columns} />
    </div>
  );
}
