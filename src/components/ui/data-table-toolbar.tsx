import { Input } from "./input";
import { Table } from "@tanstack/react-table";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { DualRangeSlider } from "./dual-range-slider";

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
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-1">
        <Input
          placeholder="Filter videos..."
          value={(table.getColumn("video")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("video")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Set Range</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="end">
          <div className="py-6 w-full">
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
  );
}
