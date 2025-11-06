import React, { useEffect } from 'react'
import "./ScrollImgs.css"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HackImg1 from "../../assets/hackathons/img1.png";
import HackImg2 from "../../assets/hackathons/img2.png";
import HackImg3 from "../../assets/hackathons/img3.webp";
import HackImg4 from "../../assets/hackathons/img4.png";
import HackImg5 from "../../assets/hackathons/img5.webp";
import HackImg6 from "../../assets/hackathons/img6.png";
import HackImg7 from "../../assets/hackathons/img7.png";
gsap.registerPlugin(ScrollTrigger);

const ScrollImgs = () => {
  useEffect(() => {
    // Animation for image scroller
    gsap.to(".imgscollor .box", {
      x: "-70%",
      scrollTrigger: {
        trigger: ".imgscollor",
        scroller: "body",
        start: "top 20%",
        end: "top -150%",
        scrub: 2,
        pin: true
      }
    });

    // REMOVE or COMMENT OUT these blocks if you don't have .head or .head2 elements:
    // gsap.to(".head h1", { ... });
    // gsap.to(".head2 h1", { ... });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="imgscollor">
      <div className="box">
        <div className="imgs">
          <img src={HackImg1} alt=""/>
        </div>
        <div className="imgs">
          <img src={HackImg2} alt=""/>
        </div>
        <div className="imgs">
          <img src={HackImg3} alt=""/>
        </div>
        <div className="imgs">
          <img src={HackImg4} alt=""/>
        </div>
        <div className="imgs">
          <img src={HackImg5} alt=""/>
        </div>
        <div className="imgs">
          <img src={HackImg6} alt=""/>
        </div>
        <div className="imgs">
          <img src={HackImg7} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default ScrollImgs
