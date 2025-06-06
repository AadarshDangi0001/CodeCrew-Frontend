import React from 'react';
import CodeCrewSmall from "../../assets/CodeCrewSmall.png";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer px-25">
      <div className="footer-divider"></div>
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={CodeCrewSmall} alt="Code Crew Logo" />
          </div>
        </div>
        
        <div className="footer-right">
          <div className="footer-links">
            <div className="link-column">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </div>
            <div className="link-column">
              <a href="/events">Events</a>
              <a href="/projects">Projects</a>
              <a href="/team">Team</a>
            </div>
            <div className="link-column">
              <a href="/faq">FAQ</a>
              <a href="/resources">Resources</a>
              <a href="/join">Join Us</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 CodeCrew | Made by Aadarsh Dangi</p>
      </div>
    </footer>
  );
};

export default Footer;