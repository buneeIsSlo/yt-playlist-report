import React, { Suspense, useState } from "react";
import { usePlaylistDuration } from "@/api/PlaylistApi";
import { useParams, useLoaderData, Await } from "react-router-dom";
import {
  PlaylistDetails,
  VideoItem,
  formatDuration,
  parseDuration,
} from "@/api/PlaylistApi";
import VideoTable from "@/components/VideosTable";
import columns from "@/components/ui/columns";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";

const PlaylistDuration: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { data } = usePlaylistDuration(playlistId!);
  const [values, setValues] = useState<number[]>([1, data?.videos.length || 1]);

  if (!data || !data.videos) {
    return <div>No video details available</div>;
  }

  console.log(values[0] - 1, values[1] + 1);

  const selectedVideos = data.videos.slice(values[0] - 1, values[1]);
  const totalDuration = selectedVideos.reduce(
    (acc, video) => acc + parseDuration(video.contentDetails.duration),
    0
  );
  const avgDuration = ~~(totalDuration / selectedVideos.length);

  return (
    <div>
      <div className="w-full flex justify-between">
        <p className="text-4xl font-bold mb-4 bg-neutral-300 py-4 px-2 rounded-xl">
          Total Duration: {formatDuration(totalDuration)}
        </p>
        <p className="text-4xl font-bold mb-4 bg-neutral-300 py-4 px-2 rounded-xl">
          Average Duration: {formatDuration(avgDuration)}
        </p>
        <p className="text-4xl font-bold mb-4 bg-neutral-300 py-4 px-2 rounded-xl">
          Total Videos: {selectedVideos.length}
        </p>
      </div>
      <div className="py-6 w-full">
        <DualRangeSlider
          label={(value) => value}
          value={values}
          onValueChange={setValues}
          min={1}
          max={data.videos.length}
          step={1}
        />
      </div>
      <div className="space-y-2">
        <VideoTable columns={columns} data={selectedVideos} />
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
