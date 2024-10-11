import { githubIcon, xIcon } from "@/assets";

const Footer = () => {
  return (
    <footer className="w-full max-h-fit mt-8 border-t -inset-10 mb-10">
      <div className="container py-2.5 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-xs md:text-sm lg:text-base">
            Made with React ⚛ and love ❤
          </p>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="https://github.com/buneeIsSlo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={githubIcon}
              className="w-4 h-4 md:w-5 md:h-5"
              alt="github"
            />
          </a>
          <a
            href="https://x.com/awwbhi2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={xIcon} className="w-3 h-3 md:w-4 md:h-4" alt="twitter" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
