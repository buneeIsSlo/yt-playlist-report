import Hero from "../components/Hero";

function Landing() {
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(red_0.1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <main className="container grid place-content-center h-full">
        <Hero />
      </main>
    </>
  );
}

export default Landing;