import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CrossAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const CrossAnimation = () => {
  const headRef = useRef(null);
  const head2Ref = useRef(null);

  useEffect(() => {
    if (headRef.current) {
      gsap.to(headRef.current, {
        x: "-50%",
        scrollTrigger: {
          trigger: headRef.current,
          scroller: "body",
          start: "top 100%",
          end: "top -150%",
          scrub: 2
        }
      });
    }

    if (head2Ref.current) {
      gsap.to(head2Ref.current, {
        x: "20%",
        scrollTrigger: {
          trigger: head2Ref.current,
          scroller: "body",
          start: "top 90%",
          end: "top -150%",
          scrub: 2
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="page2">
      <div className="head">
        <h1 ref={headRef}>
          Code Crew: Innovate, Collaborate, Build the Future Together
        </h1>
      </div>
      <div className="head2">
        <h1 ref={head2Ref}>
          Code Crew: Innovate, Collaborate, Build the Future Together
        </h1>
      </div>
    </div>
  );
};

export default CrossAnimation;
