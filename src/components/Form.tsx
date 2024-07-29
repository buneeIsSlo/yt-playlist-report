import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";

const YT_API_URL = import.meta.env.VITE_YT_PLAYLIST_API_URL;
const YT_API_KEY = import.meta.env.VITE_YT_API_KEY;

const Form = () => {
  const [url, setUrl] = useState("");
  const { mutate, data } = useMutation({ mutationFn: handleSubmit });

  async function handleSubmit(url: string) {
    if (!url.length) return;
    const playlistId = new URL(url).searchParams.get("list");
    const response = await fetch(
      `${YT_API_URL}?part=contentDetails%2Cstatus&playlistId=${playlistId}&key=${YT_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  }

  if (data) {
    console.log(data);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(url);
      }}
    >
      <div className="flex flex-row gap-2">
        <Input
          className="block"
          type="url"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit">Go</Button>
      </div>
    </form>
  );
};

export default Form;
