import { githubIcon, logoIcon } from "@/assets";
import { Button } from "./ui/button";
import { StarIcon } from "lucide-react";

const HeaderNav = () => {
  return (
    <header className="w-full backdrop-blur-lg bg-red-100/5 border-b py-2 md:py-2.5 sticky top-0 left-0 z-10">
      <div className="container flex justify-between items-center">
        <a href="/" className="">
          <div className="w-fit flex items-center pointer-events-none">
            <span className="w-8 h-8 bg-red-600 grid place-content-center rounded-lg">
              <span className="w-5 object-contain aspect-square">
                <img src={logoIcon} alt="" className="w-fit h-fit" />
              </span>
            </span>
            <p className="text-2xl font-bold italic uppercase px-1">ytpr</p>
          </div>
        </a>
        <div className="flex gap-2 items-center">
          <Button variant={"outline"} className="bg-transparent p-0 h-fit">
            <a
              href="https://github.com/buneeIsSlo/yt-playlist-report"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row-reverse items-center gap-1"
            >
              <span className="border-l p-2 flex gap-1 items-center">
                <StarIcon className="w-4 h-4  stroke-yellow-400 fill-yellow-400" />
                <span className="font-semibold">8</span>
              </span>
              <span className="px-1 md:p-2 flex flex-row-reverse items-center gap-1">
                Star on GitHub
                <img src={githubIcon} alt="" />
              </span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
