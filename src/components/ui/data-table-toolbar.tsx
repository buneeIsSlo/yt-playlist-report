import { Input } from "./input";
import { Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-1">
        <Input
          placeholder="Search videos..."
          value={(table.getColumn("video")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("video")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
    </div>
  );
}
