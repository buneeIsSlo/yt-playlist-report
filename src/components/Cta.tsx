import { Button } from "@/components/ui/button";
import { ScrollText } from "lucide-react";

const Cta = () => {
  return (
    <section className="bg-red-50 py-16 rounded-md mb-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-xs uppercase tracking-wide text-red-600 mb-2">
          what are you waiting for?
        </h2>
        <h3 className="text-4xl font-bold text-gray-900 mb-8">
          No ads. No subscriptions. Free forever.
        </h3>
        <p className="text-xl text-gray-600 mb-8">
          Generate a comprehensive report of any YouTube playlist in seconds.
        </p>
        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
          <ScrollText className="mr-2 h-5 w-5" />
          Generate Playlist Report
        </Button>
      </div>
    </section>
  );
};

export default Cta;
