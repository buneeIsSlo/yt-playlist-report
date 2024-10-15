import { Input } from "./input";
import { Table } from "@tanstack/react-table";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { DualRangeSlider } from "./dual-range-slider";
import { Settings2, TableIcon } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  rangeValue: number[];
  onRangeChange: (value: number[]) => void;
  totalVideos: number;
}

export function DataTableToolbar<TData>({
  table,
  rangeValue,
  onRangeChange,
  totalVideos,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="overflow-x-auto lg:overflow-visible">
      <div className="flex items-center justify-between gap-2 min-w-max py-1">
        <div className="flex gap-1 flex-1 items-center space-x-1">
          <Input
            placeholder="Filter videos..."
            value={(table.getColumn("video")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("video")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex gap-1.5 items-center border-[1px] border-dashed border-neutral-300"
              >
                <Settings2 className="w-4 h-4" />
                Select Range
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="min-w-96">
              <div className="py-8">
                <DualRangeSlider
                  label={(value) => `${value}`}
                  defaultValue={rangeValue}
                  onValueCommit={onRangeChange}
                  min={1}
                  max={totalVideos}
                  step={1}
                  minStepsBetweenThumbs={1}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <TableIcon className="w-4 h-4 mr-2" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
