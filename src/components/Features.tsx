interface Feature {
  id: number;
  name: string;
  description: string;
  icon: JSX.Element;
}

import {
  Calculator,
  BarChart,
  SpeakerIcon,
  Fullscreen,
  Info,
  ArrowLeftRight,
} from "lucide-react";

const iconSize = 24;

const FeaturesData: Feature[] = [
  {
    id: 1,
    name: "Calculate YouTube Playlist Length",
    description: "Determine the total duration of any YouTube playlist.",
    icon: <Calculator size={iconSize} />,
  },
  {
    id: 2,
    name: "Average Duration Insights",
    description: "Discover the average duration of videos in a playlist.",
    icon: <BarChart size={iconSize} />,
  },
  {
    id: 3,
    name: "Flexible Playback Speeds",
    description: "Find out playlist duration at different playback speeds.",
    icon: <SpeakerIcon size={iconSize} />,
  },
  {
    id: 4,
    name: "Smart Sorting Options",
    description: "Sort playlists by published date, duration, views, and more!",
    icon: <Fullscreen size={iconSize} />,
  },
  {
    id: 5,
    name: "In-depth Video Details",
    description: "Explore video stats like duration, views, and likes.",
    icon: <Info size={iconSize} />,
  },
  {
    id: 6,
    name: "Calculate Playlist Length Between Specific Videos",
    description:
      'Find playlist length between specific "From" and "To" videos.',
    icon: <ArrowLeftRight size={iconSize} />,
  },
];

const FeaturesGrid = () => {
  return (
    <div>
      <div className="mt-8 grid w-full grid-cols-2 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {FeaturesData.map((feature) => {
          return (
            <div key={feature.id} className="width-fit text-left">
              <div className="mb-2 w-fit rounded-xl bg-red-500 p-1 text-center text-white ">
                {feature.icon}
              </div>
              <div className="text-lg mb-1 font-bold text-gray-900 dark:text-gray-100">
                {feature.name}
              </div>
              <div className="font-regular max-w-sm text-gray-600  dark:text-gray-400">
                {feature.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="py-24">
      <div className="my-12 flex w-full flex-col items-center justify-center">
        <h1 className="mb-2 max-w-3xl text-center text-2xl font-black tracking-tighter text-gray-900 md:text-5xl dark:text-gray-100">
          Enhance Your YouTube Experience
        </h1>
        <p className="max-w-md text-center text-base md:text-xl text-gray-600 dark:text-gray-400">
          Discover powerful features to manage and analyze your YouTube
          playlists like never before.
        </p>
        <FeaturesGrid />
      </div>
    </section>
  );
};

export default Features;
