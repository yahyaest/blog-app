import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import siteMetadata from "@/utils/siteMetaData";


const Footer = () => {
  return (
    <footer className="m-16" id="footer">

      <div className="text-dark dark:text-light flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light my-2 md:my-0">
          Copyright © 2024 Yahya Machat
        </p>

        <div className="flex items-center mt-8">
        <a
          href={siteMetadata.linkedin}
          className="inline-block w-6 h-6 mr-4"
          aria-label="Reach out to me via LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={siteMetadata.github}
          className="inline-block w-6 h-6 mr-4"
          aria-label="Check my profile on Github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon className="dark:fill-light hover:scale-125 transition-all ease duration-200" />
        </a>
      </div>
      </div>
    </footer>
  );
};

export default Footer;