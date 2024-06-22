import { Button } from "./components/ui/button";

function App() {
  return (
    <main className="container">
      <div>
        <h1 className="text-6xl text-neutral-800 font-alpino font-black max-w-[20ch] text-center">
          Configure your YouTube playlist like a boss.
        </h1>
        <Button size={"lg"} className="font-bold">
          Configure
        </Button>
      </div>
    </main>
  );
}

export default App;
