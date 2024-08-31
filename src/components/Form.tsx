import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate, useNavigation } from "react-router-dom";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { fetchPlaylistDetails } from "@/api/PlaylistApi";

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
      <div className="max-w-[70%] mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex gap-3 items-center py-2"
        >
          <Input
            type="url"
            placeholder="Enter YouTube playlist URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isPending}
          />
          <Button className="mt-0" disabled={isPending}>
            {isPending ? "Generating..." : "Generate"}
          </Button>
        </form>
        {isPending && (
          <p className="animate-pulse text-center">
            Please wait, this may take a few seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
