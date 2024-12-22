import { Link } from "react-router-dom";
import Form from "./Form";
import { Button } from "./ui/button";
import { FlipWords } from "./ui/flip-words";
import { ytprDemo } from "@/assets";
import { ChevronRight, Presentation } from "lucide-react";

const Hero = () => {
  const strings = [
    "Get a Full Breakdown",
    "View the Total Duration",
    "Find the most viewed Video",
    "Scan to Share the Report",
  ];

  return (
    <section className="py-28">
      <div>
        <Link
          to="/playlist/PLs_BtJUr-PzQQLWIg82WdIOyYs0An9jzi"
          className="mx-auto w-fit mb-16 px-4 py-0.5 rounded-full bg-red-200/10 backdrop-blur-sm text-red-600 font-medium hover:bg-red-200/20 transition-colors shadow-md border border-red-600 flex items-center gap-1"
        >
          🎄 Best Christmas Songs Playlist
          <ChevronRight className="size-4 text-red-600" />
        </Link>
        <h1 className="text-4xl text-center md:text-6xl text-neutral-800 font-black max-w-[25ch] md:text-center mx-auto my-10">
          <FlipWords words={strings} className="px-0 text-center" />
          <br />
          of <em>any</em>{" "}
          <span className="relative block w-fit mx-auto lg:inline">
            <span className="underline decoration-red-600 decoration">
              YouTube Playlist
            </span>
            <span className="after:content-[''] after:absolute after:w-3 after:h-3 md:after:w-5 md:after:h-5 after:bg-red-600 after:rounded-full after:right--3 after:bottom-[-2px] lg:after:-right-5 lg:after:bottom-[8px]"></span>
          </span>
        </h1>
      </div>
      <Form />
      <div className="mt-16">
        <div className="flex max-w-5xl justify-center mx-auto overflow-clip relative aspect-[16/9] w-full">
          <img
            src={ytprDemo}
            alt="hero-section"
            className="h-full w-full rounded-xl object-cover md:w-[1300px] border-8 border-slate-200 block"
            style={{
              maskImage: `linear-gradient(to top, transparent, black 20%)`,
            }}
          />
          <Button
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-600 hover:bg-red-800"
            size={"lg"}
            asChild
          >
            <Link
              to="playlist/PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ"
              className="text-white flex gap-2 items-center"
              reloadDocument
            >
              <Presentation className="size-5" />
              View Demo
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-16 text-center">
        <p className="text-xl md:text-3xl text-neutral-800 font-semibold">
          <span className="text-red-600 italic font-bold">400+</span> Reports
          Generated 🎉
        </p>
      </div>
    </section>
  );
};

export default Hero;
