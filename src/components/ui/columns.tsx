import { ColumnDef } from "@tanstack/react-table";
import { formatDuration, parseDuration, VideoItem } from "@/api/PlaylistApi";
import { DataTableColumnHeader } from "./data-table-column-header";

const formatDate = (timeStr: string): string => {
  const date = new Date(timeStr);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  return date.toLocaleString("en-US", options);
};

const columns: ColumnDef<VideoItem>[] = [
  {
    id: "position",
    accessorFn: (row, index) => index + 1,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => <div>{String(row.index + 1)}</div>,
    enableHiding: false,
  },
  {
    id: "video",
    accessorFn: (row) => row.snippet.title,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Video" />
    ),
    cell: ({ row }) => (
      <div>
        <a
          href={`http://youtube.com/watch?v=${row.original.id}`}
          target="_blank"
          className="text-blue-800 font-medium underline"
        >
          {row.original.snippet.title}
        </a>
      </div>
    ),
    enableHiding: false,
  },
  {
    id: "duration",
    accessorFn: (row) => row.contentDetails.duration,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => (
      <div>
        {formatDuration(parseDuration(row.original.contentDetails.duration))}
      </div>
    ),
  },
  {
    id: "views",
    accessorFn: (row) => Number(row.statistics.viewCount),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Views" />
    ),
    cell: ({ row }) => (
      <div>{Number(row.original.statistics.viewCount).toLocaleString()}</div>
    ),
  },
  {
    id: "likes",
    accessorFn: (row) => row.statistics.likeCount,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Likes" />
    ),
    cell: ({ row }) => (
      <div>{Number(row.original.statistics.likeCount).toLocaleString()}</div>
    ),
  },
  {
    id: "date",
    accessorFn: (row) => row.snippet.publishedAt,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published at" />
    ),
    cell: ({ row }) => (
      <div>{formatDate(row.original.snippet.publishedAt)}</div>
    ),
  },
];

export default columns;
