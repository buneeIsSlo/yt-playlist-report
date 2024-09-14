import { ColumnDef } from "@tanstack/react-table";
import { VideoItem } from "@/api/PlaylistApi";
import { DataTableColumnHeader } from "./data-table-column-header";

const columns: ColumnDef<VideoItem>[] = [
  {
    id: "position",
    accessorFn: (row, index) => index + 1,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => <div>{String(row.index + 1)}</div>,
  },
  {
    id: "video",
    accessorFn: (row) => row.snippet.title,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Video" />
    ),
    cell: ({ row }) => (
      <span>
        <a
          href={`http://youtube.com/watch?v=${row.original.id}`}
          target="_blank"
          className="text-blue-800 font-medium underline"
        >
          {row.original.snippet.title}
        </a>
      </span>
    ),
  },
  {
    id: "views",
    accessorFn: (row) => Number(row.statistics.viewCount),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Views" />
    ),
    cell: ({ row }) => (
      <span>{Number(row.original.statistics.viewCount).toLocaleString()}</span>
    ),
  },
  {
    id: "likes",
    accessorFn: (row) => row.statistics.likeCount,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Likes" />
    ),
    cell: ({ row }) => (
      <p>{Number(row.original.statistics.likeCount).toLocaleString()}</p>
    ),
  },
];

export default columns;
