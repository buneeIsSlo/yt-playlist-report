import { useQuery, type QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";

export interface IPlaylist {
  kind: string;
  etag: string;
  nextPageToken?: string;
  items: IPlaylistItem[];
  pageInfo: PageInfo;
}

export interface IPlaylistItem {
  kind: string;
  etag: string;
  id: string;
  contentDetails: IContentDetails;
}

export interface IContentDetails {
  videoId: string;
  videoPublishedAt: Date;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

type TVideoDetails = {
  contentDetails: {
    duration: string;
  };
};

const YT_PLAYLIST_API_URL = import.meta.env.VITE_YT_PLAYLIST_API_URL;
const YT_VIDEOS_API_URL = import.meta.env.VITE_YT_VIDEOS_API_URL;
const YT_API_KEY = import.meta.env.VITE_YT_API_KEY;

const parseDuration = (duration: string): number => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = parseInt(match?.[1] ?? "0") || 0;
  const minutes = parseInt(match?.[2] ?? "0") || 0;
  const seconds = parseInt(match?.[3] ?? "0") || 0;
  return hours * 3600 + minutes * 60 + seconds;
};

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
};

const fetchPlaylistItems = async (playlistId: string): Promise<string[]> => {
  const videoIds: string[] = [];
  let nextPageToken: string | undefined;

  do {
    const response = await fetch(
      `${YT_PLAYLIST_API_URL}?part=contentDetails&playlistId=${playlistId}&key=${YT_API_KEY}&maxResults=50${
        nextPageToken ? `&pageToken=${nextPageToken}` : ""
      }`
    );
    const data: IPlaylist = await response.json();
    videoIds.push(
      ...data.items.map((item: IPlaylistItem) => item.contentDetails.videoId)
    );
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return videoIds;
};

const fetchVideoDetails = async (videoIds: string[]): Promise<number> => {
  const fetchChunk = async (chunk: string[]): Promise<number> => {
    const response = await fetch(
      `${YT_VIDEOS_API_URL}?part=contentDetails&id=${chunk.join(
        ","
      )}&key=${YT_API_KEY}`
    );
    const data = await response.json();
    return data.items.reduce(
      (acc: number, item: TVideoDetails) =>
        acc + parseDuration(item.contentDetails.duration),
      0
    );
  };

  const chunks = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    chunks.push(videoIds.slice(i, i + 50));
  }

  const results = await Promise.all(chunks.map(fetchChunk));
  return results.reduce((a, b) => a + b, 0);
};

const calculatePlaylistDuration = async (
  playlistId: string
): Promise<string> => {
  const videoIds = await fetchPlaylistItems(playlistId);
  const totalSeconds = await fetchVideoDetails(videoIds);
  return formatDuration(totalSeconds);
};

export const getPlaylistDuration = (id: string) => ({
  queryKey: ["playlist", "duration", id],
  queryFn: () => calculatePlaylistDuration(id),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const query = getPlaylistDuration(params.playlistId as string);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const usePlaylistDuration = (playlistId: string) => {
  return useQuery(getPlaylistDuration(playlistId));
};
