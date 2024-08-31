import { useSuspenseQuery, type QueryClient } from "@tanstack/react-query";
import { defer, LoaderFunction, LoaderFunctionArgs } from "react-router-dom";

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

export interface IPlaylistDetails {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
}

const YT_PLAYLIST_API_URL = import.meta.env.VITE_YT_PLAYLIST_API_URL;
const YT_VIDEOS_API_URL = import.meta.env.VITE_YT_VIDEOS_API_URL;
const YT_PLAYLISTS = "https://www.googleapis.com/youtube/v3/playlists";
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
  staleTime: 5 * 60 * 1000,
});

// New API function to fetch playlist details
export const fetchPlaylistDetails = async (
  playlistId: string
): Promise<IPlaylistDetails> => {
  const response = await fetch(
    `${YT_PLAYLISTS}?part=snippet&id=${playlistId}&key=${YT_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const playlist = data.items[0];

  return {
    id: playlist.id,
    title: playlist.snippet.title,
    description: playlist.snippet.description,
    thumbnails: playlist.snippet.thumbnails,
  };
};

export const loadPlaylist = (queryClient: QueryClient): LoaderFunction => {
  return async ({ params }: LoaderFunctionArgs) => {
    console.log("Loader function called with params:", params);

    if (!params.playlistId) {
      console.error("Playlist ID is missing");
      throw new Error("Playlist ID is required");
    }

    try {
      console.log("Fetching playlist details for ID:", params.playlistId);
      const playlistDetails = await queryClient.ensureQueryData({
        queryKey: ["playlistDetails", params.playlistId],
        queryFn: () => fetchPlaylistDetails(params.playlistId as string),
      });
      console.log("Playlist details fetched:", playlistDetails);

      console.log("Fetching playlist duration");
      const durationPromise = queryClient.ensureQueryData(
        getPlaylistDuration(params.playlistId)
      );

      return {
        playlistDetails,
        duration: defer(durationPromise),
      };
    } catch (error) {
      console.error("Error in loader function:", error);
      throw error;
    }
  };
};

export const loader = (queryClient: QueryClient): LoaderFunction => {
  return (args: LoaderFunctionArgs) => {
    console.log("Outer loader function called");
    return loadPlaylist(queryClient)(args);
  };
};

export const usePlaylistDuration = (playlistId: string) => {
  return useSuspenseQuery(getPlaylistDuration(playlistId));
};
