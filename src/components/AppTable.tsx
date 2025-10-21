import type { ColumnDef } from '@tanstack/react-table';

import { DataTable } from './DataTable';

interface AppTableProps<TData, TValue> {
  data: TData[];
  isLoading?: boolean;
  columns: ColumnDef<TData, TValue>[];
  contextMenuComponent?: React.ComponentType<{ data: TData; children: React.ReactNode }>;
}

export function AppTable<TData, TValue>({
  data,
  isLoading = false,
  columns,
  contextMenuComponent,
}: AppTableProps<TData, TValue>) {
  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      contextMenuComponent={contextMenuComponent}
    />
  );
}
