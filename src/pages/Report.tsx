import { Suspense } from "react";
import { usePlaylistDuration } from "@/api/PlaylistApi";
import { useParams, useLoaderData, Await } from "react-router-dom";

const PlaylistDuration = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { data: duration } = usePlaylistDuration(playlistId ?? "");

  return (
    <p className="text-8xl text-red-500 font-bold">
      Total Duration: {duration}
    </p>
  );
};

const PlaylistDetails = ({ details }: { details: any }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold">{details.title}</h2>
      <p>{details.description}</p>
      <img src={details.thumbnails.medium.url} alt={details.title} />
    </div>
  );
};

const Report = () => {
  const { playlistDetails, duration } = useLoaderData() as {
    playlistDetails: any;
    duration: Promise<string>;
  };

  return (
    <div>
      <h1 className="text-5xl font-bold">Playlist Report</h1>
      <PlaylistDetails details={playlistDetails} />
      <Suspense fallback={<div>Loading playlist duration...</div>}>
        <Await resolve={duration}>
          <PlaylistDuration />
        </Await>
      </Suspense>
    </div>
  );
};

export default Report;
