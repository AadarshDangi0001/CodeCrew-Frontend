import React, { useState } from 'react';
import './Fnq.css';

const faqData = [
  {
    question: "What is Code Crew?",
    answer: "Code Crew is a vibrant tech community of developers, designers, and innovators passionate about building real-world solutions. From hackathons to open-source projects, it’s a space to grow, collaborate, and turn ideas into impact."
  },
  {
    question: "How can I join?",
    answer: "Just fill out the registration form on our website and join our Discord server to become a part of Code Crew. That’s it—you’re in!"
  },
  {
    question: "What are the benefits of joining Code Crew?",
    answer: "You don’t need to be an expert—just bring curiosity and a passion to learn. Whether you're into coding, design, AI, or any tech field, Code Crew welcomes all skill levels and helps you grow through hands-on experience."
  },
  {
    question: "What skills do I need to join Code Crew?",
    answer: "Code Crew lets you join hackathons, work in teams, and solve real-world problems while learning new tech stacks. You’ll build experience, grow your network, and boost your resume—all while being part of a supportive and innovative tech community."
  }
];

const Fnq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div>
      <div className="view-5">
        <h1>FAQ&nbsp;& SUPPORT</h1>
        <div className="faq">
          {faqData.map((item, idx) => (
            <div
              className={`faq1-item${openIndex === idx ? ' active' : ''}`}
              key={idx}
            >
              <div className="faq1-question" onClick={() => handleToggle(idx)}>
                <h3>{item.question}</h3>
                <div className="faq1-icon">{openIndex === idx ? '−' : '＋'}</div>
              </div>
              <div className="faq1-answer" style={{ display: openIndex === idx ? 'block' : 'none' }}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fnq;
