import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const heading = "ABOUT US";
const para1 =
  "Code Crew is a dynamic team dedicated to participating in hackathons and coding competitions. Founded by Aadarsh Dangi, a student of Oriental College, Bhopal, our mission is to bridge the gap for students in tier-3 colleges who primarily focus on web development and other tech stacks but often lack opportunities to apply their skills to real-world problems. Many talented students remain unaware of hackathons or struggle to find the right team to participate, limiting their growth and exposure.";
const para2 =
  "WTo solve this, we’ve built a community of coders who collaborate on hackathons and competitive programming challenges, enabling students to gain hands-on experience. Building an impressive resume can be tough, especially when good internships are scarce and difficult to secure. Hackathons provide an excellent platform to strengthen skills, showcase teamwork, and solve real-world challenges—all of which make a resume stand out.";
const para3 = 
" At Code Crew, we believe that innovation and problem-solving should not be limited by location or background. We actively encourage students to push their limits, learn new technologies, and develop solutions that matter. By working on cutting-edge projects and competing on global platforms, we prepare our members for the tech industry while fostering a spirit of continuous learning and collaboration. Whether you're a beginner or an experienced coder, if you're passionate about building, learning, and competing, Code Crew is the right place for you!"

function splitWords(text) {
  return text.split(" ").map((word, i) => (
    <span key={i} className="inline-block opacity-0 mr-2">
      {word}
    </span>
  ));
}

const AboutPage = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const words = sectionRef.current.querySelectorAll(".inline-block");
    gsap.set(words, { opacity: 0 });

    gsap.to(words, {
      opacity: 1,
      stagger: 0.08,
      ease: "power1.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 87%",
        scrub: true,
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className='mt-30'>
      <div ref={sectionRef} className="home-section-2">
        <h1 className="text-white maintext">{splitWords(heading)}</h1>
        <h3 className="text-white">{splitWords(para1)}</h3>
        <h3 className="text-white">{splitWords(para2)}</h3>
        <h3 className="text-white">{splitWords(para3)}</h3>
      </div>
    </div>
  );
};

export default AboutPage;
