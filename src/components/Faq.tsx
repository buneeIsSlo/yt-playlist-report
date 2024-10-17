import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TQuestion = {
  question: string;
  answer: React.ReactNode;
};

const questions: TQuestion[] = [
  {
    question: "What is YT Playlist Report?",
    answer:
      "YT Playlist Report is a web app that helps you break down YouTube playlists in detail. You get stats like total duration, average video length, and various details for each video in the playlist.",
  },
  {
    question: "Can I generate reports of private or unlisted playlists?",
    answer:
      "Unfortunately, that's not possible. Private or unlisted playlists are off-limits because the YouTube API doesn't grant access without proper authentication.",
  },
  {
    question: "How accurate is the duration calculation?",
    answer:
      "The duration is based on YouTube API data, which is generally very reliable. Just keep in mind that for live streams or upcoming videos, the duration might be missing or inaccurate.",
  },
  {
    question: "Why not create a browser extension instead?",
    answer:
      "I prefer simplicity. This web app gives you all the playlist insights without the need for any installations!",
  },
  {
    question: "What if something breaks or if I encounter an error?",
    answer: (
      <>
        If you run into an error, my bad 😝. Try double-checking that the
        playlist URL is correct and the playlist is public. If that doesn't
        help, please reach out to me on{" "}
        <a
          href="https://x.com/awwbhi2"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
        >
          x.com
        </a>
      </>
    ),
  },
  {
    question: "This app is pretty rad, how can I support you?",
    answer: (
      <>
        😇 You're a real one. A star on the{" "}
        <a
          href="https://github.com/buneeIsSlo/yt-playlist-report"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
        >
          GitHub repo
        </a>{" "}
        would be more than enough!
      </>
    ),
  },
];

const Faq: React.FC = () => {
  return (
    <section className="py-20">
      <div className="mx-auto w-full">
        <div className="mx-auto flex w-full flex-col items-center justify-center">
          <p className="text-xs md:text-sm uppercase tracking-wide text-red-600 mb-2">
            faq
          </p>
          <h2 className="mb-2 max-w-3xl text-center text-3xl font-black tracking-tight md:text-5xl dark:text-gray-100">
            Frequently Asked Questions
          </h2>
          <p className="max-w-md text-center text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Check out these frequently asked questions! Click on the question to
            reveal the answer.
          </p>
          <div className="w-full pt-12 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {questions.map((question, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base md:text-md">
                    {question.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {question.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
