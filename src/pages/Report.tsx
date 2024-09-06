import React, { Suspense } from "react";
import { usePlaylistDuration } from "@/api/PlaylistApi";
import { useParams, useLoaderData, Await } from "react-router-dom";
import { PlaylistDetails, VideoItem } from "@/api/PlaylistApi";

const PlaylistDuration: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { data } = usePlaylistDuration(playlistId!);

  console.log(data);
  if (!data || !data.videos) {
    return <div>No video details available</div>;
  }

  return (
    <div>
      <p className="text-4xl text-red-500 font-bold mb-4">
        Total Duration: {data.duration}
      </p>
      <div className="space-y-2">
        {data.videos.map((video: VideoItem, i: number) => (
          <div key={i + video.id} className="border-b pb-2">
            <p className="text-lg text-blue-600">
              {video.snippet?.title || "No title"}
            </p>
            <p className="text-sm text-gray-500">
              {video.snippet?.description?.slice(0, 100) || "No description"}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlaylistInfo: React.FC<{ details: PlaylistDetails }> = ({ details }) => {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold mb-2">{details.title}</h2>
      <p className="mb-4">{details.description}</p>
      {details.thumbnails?.medium?.url && (
        <img
          src={details.thumbnails.medium.url}
          alt={details.title}
          className="rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

interface LoaderData {
  playlistDetails: PlaylistDetails;
  videoDetails: Promise<{ videos: VideoItem[]; duration: string }>;
}

const Report: React.FC = () => {
  const { playlistDetails, videoDetails } = useLoaderData() as LoaderData;

  if (!playlistDetails) {
    return <div>Error: Failed to load playlist data</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-8">Playlist Report</h1>
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
