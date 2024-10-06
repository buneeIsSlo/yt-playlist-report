import { logoIcon } from "@/assets";

const HeaderNav = () => {
  return (
    <header className="w-full backdrop-blur-lg bg-red-100/5 border-b py-2 sticky top-0 left-0">
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
          <a href="http://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="http://x.com" target="_blank" rel="noopener noreferrer">
            X
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
