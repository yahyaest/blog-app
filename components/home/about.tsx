import { FaLocationArrow } from "react-icons/fa6";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";
import MagicButton from "../ui/MagicButton";

const About = () => {
  return (
    <div id="about" className="pb-20 pt-36">
      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-screen w-full bg-black-100 bg-grid-white/[0.03] 
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          // chnage the bg to bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100
          [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          {/* <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Dynamic Web Magic with Next.js
          </p> */}

          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          <TextGenerateEffect
            words="The Full Stack Blog: Exploring All Aspects of Software Development"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <div className="flex flex-col sm:flex-row items-center mt-10">
            <div className="text-dark dark:text-light md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
              Welcome to The Full Stack Blog! My name is{" "}
              <span className="text-crimson">Yahya Machat</span>, a full-stack
              developer fueled by a passion for building responsive and scalable
              web applications using clean and efficient code.
              <div className="my-10"></div> 
              Here, we&apos;ll delve into all aspects
              of software development, from the front-end magic that users see
              to the back-end machinery that makes it tick.
            </div>
          </div>

          <a href="#projects" className="mt-5">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
