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
      <div className="flex gap-4 items-start py-2">
        <div className="rounded-md shadow-md w-24 h-[54px] flex-shrink-0 overflow-clip">
          <img
            src={row.original.snippet.thumbnails.high.url}
            alt={row.original.snippet.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <a
            href={`https://youtube.com/watch?v=${row.original.id}`}
            target="_blank"
            className="text-blue-600 hover:text-blue-800 font-medium hover:underline line-clamp-2 flex-grow"
            title={row.original.snippet.title}
          >
            {row.original.snippet.title.length > 40
              ? row.original.snippet.title.slice(0, 40) + "..."
              : row.original.snippet.title}
          </a>
          <span className="text-gray-500">
            {row.original.snippet.channelTitle}
          </span>
        </div>
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
