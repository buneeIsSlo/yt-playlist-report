import Form from "./Form";
import { FlipWords } from "./ui/flip-words";
import { ytprDemo } from "@/assets";

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
        <h1 className="text-4xl text-center md:text-6xl text-neutral-800 font-black max-w-[25ch] md:text-center mx-auto my-10">
          <FlipWords words={strings} className="px-0 text-center" />
          <br />
          of any{" "}
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
        <div className="flex max-w-5xl justify-center mx-auto overflow-clip">
          <img
            src={ytprDemo}
            alt="hero-section"
            className="h-full w-full rounded-xl object-cover md:w-[1300px] border-8 border-slate-200 block"
            style={{
              maskImage: `linear-gradient(to top, transparent, black 20%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
