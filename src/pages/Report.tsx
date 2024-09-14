import React, { Suspense } from "react";
import { usePlaylistDuration } from "@/api/PlaylistApi";
import { useParams, useLoaderData, Await } from "react-router-dom";
import { PlaylistDetails, VideoItem } from "@/api/PlaylistApi";
import VideoTable from "@/components/VideosTable";
import columns from "@/components/ui/columns";

const PlaylistDuration: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { data } = usePlaylistDuration(playlistId!);

  if (!data || !data.videos) {
    return <div>No video details available</div>;
  }

  return (
    <div>
      <div className="w-full flex justify-between">
        <p className="text-4xl font-bold mb-4 bg-neutral-300 py-4 px-2 rounded-xl">
          Total Duration: {data.duration}
        </p>
        <p className="text-4xl font-bold mb-4 bg-neutral-300 py-4 px-2 rounded-xl">
          Average Duration: {data.avgDuration}
        </p>
        <p className="text-4xl font-bold mb-4 bg-neutral-300 py-4 px-2 rounded-xl">
          Total Videos: {data.videos.length}
        </p>
      </div>
      <div className="space-y-2">
        <VideoTable columns={columns} data={data.videos} />
      </div>
    </div>
  );
};

const PlaylistInfo: React.FC<{ details: PlaylistDetails }> = ({ details }) => {
  return (
    <div className="mb-6 w-full text-center">
      <h2 className="text-5xl font-bold mb-14">{details.title}</h2>
    </div>
  );
};

interface LoaderData {
  playlistDetails: PlaylistDetails;
  videoDetails: Promise<{
    videos: VideoItem[];
    duration: string;
    avgDuration: string;
  }>;
}

const Report: React.FC = () => {
  const { playlistDetails, videoDetails } = useLoaderData() as LoaderData;

  if (!playlistDetails) {
    return <div>Error: Failed to load playlist data</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PlaylistInfo details={playlistDetails} />
      <Suspense
        fallback={<div className="text-2xl">Loading playlist duration...</div>}
      >
        <Await
          resolve={videoDetails}
          errorElement={<div>Error loading playlist details</div>}
        >
          <PlaylistDuration />
        </Await>
      </Suspense>
    </div>
  );
};

export default Report;
