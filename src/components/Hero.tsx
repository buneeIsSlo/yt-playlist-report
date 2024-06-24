import { Button } from "./ui/button";
import { BorderBeam } from "@/components/magicui/border-beam.tsx";

const Hero = () => {
  return (
    <>
      <div>
        <h1 className="text-6xl text-neutral-800 font-alpino font-black max-w-[25ch] text-center mx-auto my-10">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit!
        </h1>
        <Button size={"lg"} className="font-bold">
          Configure
        </Button>
      </div>

      <div className="relative h-[200px] w-[200px] rounded-xl bg-neutral-200">
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
    </>
  );
};

export default Hero;
