import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate, useNavigation } from "react-router-dom";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { fetchPlaylistDetails } from "@/api/PlaylistApi";
import { Loader } from "lucide-react";

const Form = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const navigation = useNavigation();

  const playlistMutation = useMutation({
    mutationFn: fetchPlaylistDetails,
    onSuccess: (data) => {
      navigate(`playlist/${data.id}`, { state: { playlistDetails: data } });
    },
    onError: (error) => {
      console.error("Error fetching playlist details:", error);
    },
  });

  const isPending =
    navigation.state === "loading" || playlistMutation.isPending;

  function handleSubmit() {
    if (!url.length) {
      throw new Error("Invalid playlist URL");
    }
    const playlistId = new URL(url).searchParams.get("list");
    if (!playlistId) {
      throw new Error("Invalid playlist URL");
    }
    playlistMutation.mutate(playlistId);
  }

  return (
    <div className="w-full">
      <div className="md:max-w-[70%] mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full flex flex-col lg:flex-row gap-3 items-center py-2"
        >
          <Input
            type="url"
            placeholder="Enter YouTube playlist URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isPending}
            className="w-full py-6 md:py-6 text-base md:text-base"
          />
          <Button
            className="mt-0 w-full py-6 md:py-6 md:px-8 md:text-base lg:w-fit bg-red-600 hover:bg-red-800 transition-colors"
            disabled={isPending}
          >
            {isPending ? "Generating..." : "Generate"}
          </Button>
        </form>
        {isPending && (
          <div className="w-fit mx-auto py-1 px-3 mt-2 flex items-center gap-2 rounded-full bg-neutral-200">
            <Loader className="w-4 h-4 animate-spin" />
            <p className="animate-pulse text-center">
              Please wait, this may take a few seconds...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
