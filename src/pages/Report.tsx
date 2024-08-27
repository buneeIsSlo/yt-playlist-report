import { useQuery, QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, useParams } from "react-router-dom";

const YT_PLAYLIST_API_URL = import.meta.env.VITE_YT_PLAYLIST_API_URL;
const YT_VIDEOS_API_URL = import.meta.env.VITE_YT_VIDEOS_API_URL;
const YT_API_KEY = import.meta.env.VITE_YT_API_KEY;

type TPlaylistItem = {
  contentDetails: {
    videoId: string;
  };
};

type TVideoDetails = {
  contentDetails: {
    duration: string;
  };
};

// eslint-disable-next-line react-refresh/only-export-components
async function calculatePlaylistDuration(id: string) {
  const playlistId = id;
  console.log(playlistId);
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
      ...data.items.map((item: TPlaylistItem) => item.contentDetails.videoId)
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
    data.items.forEach((item: TVideoDetails) => {
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

const getPlaylistInfo = (id: string) => ({
  queryKey: ["playlist", "report", id],
  queryFn: async () => await calculatePlaylistDuration(id),
});

// eslint-disable-next-line react-refresh/only-export-components
export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const query = getPlaylistInfo(params.playlistId as string);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const Report = () => {
  const params = useParams();
  const { data } = useQuery(getPlaylistInfo(params.playlistId as string));

  return (
    <div>
      <h1 className="text-5xl">Report</h1>
      {data && (
        <h2 className="text-red-500 text-9xl font-extrabold">
          {JSON.stringify(data)}
        </h2>
      )}
    </div>
  );
};

export default Report;
