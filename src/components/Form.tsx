import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate, useNavigation } from "react-router-dom";
import { Button } from "./ui/button";

const Form = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isPending = navigation.state === "loading";

  function handleSubmit() {
    if (!url.length) return;
    const playlistId = new URL(url).searchParams.get("list");
    navigate(`playlist/${playlistId}`);
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
            Please wait, this may take few seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
