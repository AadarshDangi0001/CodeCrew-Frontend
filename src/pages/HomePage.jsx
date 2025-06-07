import React, { useEffect, useRef } from "react";
import CodeCrewLogo from "../assets/CodeCrewLogo2.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Community from "../components/communitys/Community.jsx";
import Fnq from "../components/fnq/Fnq.jsx";
import Midesection from "../components/mIdsection/Midesection.jsx";
import ScrollImgs from "../components/ScrollImgs/ScrollImgs.jsx";
import CrossAnimation from "../components/CrossAnimation/CrossAnimation.jsx";


gsap.registerPlugin(ScrollTrigger);

const heading = "WHAT IS CODE CREW ?";
const para1 =
  "Code Crew is a team dedicated to participating in hackathons and coding competitions. Our mission is to bridge the gap for students in tier 3 colleges who focus primarily on web development and other tech stacks, but often don't have the opportunity to apply their skills to real-world problems. Many students are unaware of hackathons or lack the right team to participate.";
const para2 =
  "We’ve created a community of coders who collaborate on hackathons and competitive programming challenges, giving students the chance to gain hands-on experience. Building an impressive resume can be tough, as good internships are scarce and hard to secure. Hackathons, however, offer an excellent opportunity to not only strengthen your skills but also to showcase your teamwork and problem-solving abilities, making your resume stand out.";

function splitWords(text) {
  return text.split(" ").map((word, i) => (
    <span key={i} className="inline-block opacity-0 mr-2">
      {word}
    </span>
  ));
}

const HomePage = () => {
  const sectionRef = useRef(null);

   useEffect(() => {
    const words = sectionRef.current.querySelectorAll(".inline-block");
    gsap.set(words, { opacity: 0 }); // Ensure all words start hidden

    gsap.to(words, {
      opacity: 1,
      stagger: 0.08,
      ease: "power1.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 87%",
        scrub: true, // <-- This ties animation to scroll
      },
    });

  

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="main bg-black w-screen  h-full">
      <div className="home-logo w-screen h-[40vh] md:h-screen flex items-center justify-center bg-black">
        <img
          className="max-w-full max-h-full object-contain"
          src={CodeCrewLogo}
          alt="Code Crew Logo"
        />
      </div>
      <CrossAnimation/>
      <div
        ref={sectionRef}
        className="home-section-2  "
      >
        <h1 className="text-white  maintext">{splitWords(heading)}</h1>

        <h3 className="text-white ">
          {splitWords(para1)}
        </h3>

        <h3 className="text-white  ">
          {splitWords(para2)}
        </h3>
      </div>
     <ScrollImgs/>
       <Midesection/>
       <Community/>
       <Fnq/>

       
    </div>
  );
};

export default HomePage;
