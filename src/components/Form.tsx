import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const YT_PLAYLIST_API_URL = import.meta.env.VITE_YT_PLAYLIST_API_URL;
const YT_VIDEOS_API_URL = import.meta.env.VITE_YT_VIDEOS_API_URL;
const YT_API_KEY = import.meta.env.VITE_YT_API_KEY;

interface PlaylistItem {
  contentDetails: {
    videoId: string;
  };
}

interface VideoDetails {
  contentDetails: {
    duration: string;
  };
}

const Form = () => {
  const [url, setUrl] = useState("");
  const [totalDuration, setTotalDuration] = useState<string | null>(null);

  const { mutate, isPending, error } = useMutation({
    mutationFn: calculatePlaylistDuration,
    onSuccess: (duration) => setTotalDuration(duration as string),
  });

  async function calculatePlaylistDuration(url: string) {
    if (!url.length) return;
    const playlistId = new URL(url).searchParams.get("list");
    if (!playlistId) throw new Error("Invalid playlist URL");

    let nextPageToken: string | undefined;
    const videoIds: string[] = [];

    do {
      const response = await fetch(
        `${YT_PLAYLIST_API_URL}?part=contentDetails&playlistId=${playlistId}&key=${YT_API_KEY}&maxResults=50${
          nextPageToken ? `&pageToken=${nextPageToken}` : ""
        }`
      );
      const data = await response.json();
      videoIds.push(
        ...data.items.map((item: PlaylistItem) => item.contentDetails.videoId)
      );
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    let totalSeconds = 0;

    for (let i = 0; i < videoIds.length; i += 50) {
      const chunk = videoIds.slice(i, i + 50);
      const response = await fetch(
        `${YT_VIDEOS_API_URL}?part=contentDetails&id=${chunk.join(
          ","
        )}&key=${YT_API_KEY}`
      );
      const data = await response.json();
      data.items.forEach((item: VideoDetails) => {
        const duration = item.contentDetails.duration;
        const seconds = parseDuration(duration);
        totalSeconds += seconds;
      });
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  function parseDuration(duration: string): number {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match?.[1] ?? "0") || 0;
    const minutes = parseInt(match?.[2] ?? "0") || 0;
    const seconds = parseInt(match?.[3] ?? "0") || 0;
    return hours * 3600 + minutes * 60 + seconds;
  }

  return (
    <div className="w-[350px]">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate(url);
          }}
          className="space-y-4"
        >
          <Input
            type="url"
            placeholder="Enter YouTube playlist URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Calculating..." : "Calculate Duration"}
          </Button>
        </form>
        {error && (
          <p className="text-red-500 mt-2">Error: {(error as Error).message}</p>
        )}
        {totalDuration && (
          <p className="mt-4">Total playlist duration: {totalDuration}</p>
        )}
      </div>
    </div>
  );
};

export default Form;
