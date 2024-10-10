interface Feature {
  id: number;
  name: string;
  description: string;
  icon: JSX.Element;
}

import {
  BookOpen,
  Gauge,
  ArrowDownNarrowWide,
  Sparkle,
  SlidersHorizontal,
  View,
} from "lucide-react";

const iconSize = 18;

const FeaturesData: Feature[] = [
  {
    id: 1,
    name: "Comprehensive Insights",
    description:
      "Get detailed info about your playlists, including total duration, average video duration, number of videos, and specific details for each video.",
    icon: <BookOpen size={iconSize} />,
  },
  {
    id: 2,
    name: "Playback Speed Adjustment",
    description:
      "Customize your viewing experience by adjusting the playback speed from 0.25x to 2x, allowing you to plan your binge sessions effectively.",
    icon: <Gauge size={iconSize} />,
  },
  {
    id: 3,
    name: "Flexible Sorting Options",
    description:
      "Easily sort videos by position, duration, views, likes, or publish date by clicking on the column headers in the video table.",
    icon: <ArrowDownNarrowWide size={iconSize} />,
  },
  {
    id: 4,
    name: "Efficient Filtering",
    description:
      "Use the search bar above the video table to quickly filter and find specific videos within your playlist.",
    icon: <Sparkle size={iconSize} />,
  },
  {
    id: 5,
    name: "Targeted Analysis",
    description:
      "Analyze only the portions of the playlist that interest you with a range selector, enabling focused insights.",
    icon: <SlidersHorizontal size={iconSize} />,
  },
  {
    id: 6,
    name: "Customizable Table View",
    description:
      "Tailor your video table by toggeling specific columns using the 'Columns' dropdown, ensuring you see what matters most to you.",
    icon: <View size={iconSize} />,
  },
];

const FeaturesGrid = () => {
  return (
    <section>
      <div className="pt-12 grid w-full grid-cols gap-12 md:grid-cols-2 lg:grid-cols-3">
        {FeaturesData.map((feature) => {
          return (
            <div key={feature.id} className="width-fit text-left">
              <div className="mb-2 w-fit rounded-lg bg-red-500 p-1.5 text-center text-white ">
                {feature.icon}
              </div>
              <div className="text-lg mb-1 font-bold md:text-xl dark:text-gray-100">
                {feature.name}
              </div>
              <div className="font-regular text-sm text-gray-600 md:text-lg dark:text-gray-400">
                {feature.description}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-20">
      <div className="flex w-full flex-col items-center justify-center">
        <p className="text-xs md:text-sm uppercase tracking-wide text-red-600 mb-2">
          features
        </p>
        <h2 className="mb-2 max-w-4xl text-center text-3xl font-black tracking-tighter md:text-5xl dark:text-gray-100">
          Gain Insights into YouTube Playlists
        </h2>
        <p className="max-w-xs text-center text-base sm:max-w-sm md:text-xl text-gray-600 dark:text-gray-400">
          Discover powerful features to manage and analyze any public YouTube
          playlists.
        </p>
        <FeaturesGrid />
      </div>
    </section>
  );
};

export default Features;
