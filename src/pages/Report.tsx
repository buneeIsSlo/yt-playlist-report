import { usePlaylistDuration } from "@/api/PlaylistApi";
import { useParams } from "react-router-dom";

const Report = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { data: duration, isLoading, error } = usePlaylistDuration(playlistId!);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div>
      <h1 className="text-5xl font-bold">Playlist Duration Report</h1>
      {duration && (
        <p className="text-8xl text-red-500 font-bold">
          Total Duration: {duration}
        </p>
      )}
    </div>
  );
};

export default Report;
