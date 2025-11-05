import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHackathons } from "../utils/api";
import "./Hackathons.css";

const HackathonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hack, setHack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    getHackathons().then((res) => {
      if (res.success) {
        const found = res.data.find((h) => h._id === id);
        setHack(found || null);
      }
      setLoading(false);
    });

    // Check if event is already saved
    checkIfSaved();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const checkIfSaved = () => {
    const savedEvents = JSON.parse(localStorage.getItem('savedHackathons') || '[]');
    const isEventSaved = savedEvents.some(event => event._id === id);
    setIsSaved(isEventSaved);
  };

  const handleSaveEvent = () => {
    if (!hack) return;

    const savedEvents = JSON.parse(localStorage.getItem('savedHackathons') || '[]');
    
    if (isSaved) {
      // Remove from saved events
      const updatedEvents = savedEvents.filter(event => event._id !== hack._id);
      localStorage.setItem('savedHackathons', JSON.stringify(updatedEvents));
      setIsSaved(false);
      alert('Event removed from saved events!');
    } else {
      // Add to saved events
      savedEvents.push(hack);
      localStorage.setItem('savedHackathons', JSON.stringify(savedEvents));
      setIsSaved(true);
      alert('Event saved successfully!');
    }
  };

  const handleRegisterClick = (e) => {
    if (!hack.link || hack.link === '#') {
      e.preventDefault();
      alert('Registration link not available yet. Please check back later.');
    }
  };

  // Ensure URL has proper protocol
  const getValidUrl = (url) => {
    if (!url || url === '#') return '#';
    // If URL doesn't start with http:// or https://, add https://
    if (!url.match(/^https?:\/\//i)) {
      return `https://${url}`;
    }
    return url;
  };

  if (loading) return <div className="hackathons-loading">Loading...</div>;
  if (!hack) return <div className="hackathons-loading">Hackathon not found.</div>;

  return (
    <div className="hackathon-detail-page">
      {/* Hero Section with Image/Gradient */}
      <section className="detail-hero-section">
        <div className="hero-bg-wrapper">
          {hack.image ? (
            <img src={hack.image} alt={hack.name} className="hero-bg-image" />
          ) : (
            <div className="hero-bg-gradient" />
          )}
          <div className="hero-bg-overlay" />
        </div>
        
        <div className="detail-hero-container">
          <button onClick={() => navigate(-1)} className="detail-back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Hackathons
          </button>
          
          <div className="hero-content-wrapper">
            <div className="hero-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Featured Event
            </div>
            
            <h1 className="detail-hero-title">{hack.name}</h1>
            
            <div className="hero-meta-row">
              <div className="hero-meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>{hack.date ? new Date(hack.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBA'}</span>
              </div>
              
              <div className="hero-meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{hack.venue || 'Venue TBA'}</span>
              </div>
            </div>
            
            <div className="hero-cta-row">
              <a 
                className="detail-primary-btn" 
                href={getValidUrl(hack.link)} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleRegisterClick}
              >
                Register Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <button className="detail-secondary-btn" onClick={handleSaveEvent}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                {isSaved ? 'Saved' : 'Save Event'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="detail-content-wrapper">
        <div className="detail-grid-container">
          {/* Main Content Column */}
          <article className="detail-main-column">
            {/* Quick Stats Bar */}
            <div className="detail-stats-grid">
              <div className="stat-card">
                <div className="stat-icon prize-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Prize Pool</span>
                  <span className="stat-value">{hack.prizePool || 'TBA'}</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon fee-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
                    <path d="M12 18V6"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Entry Fee</span>
                  <span className="stat-value">{hack.entryFee || 'Free'}</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon rounds-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Rounds</span>
                  <span className="stat-value">{hack.rounds || '3'}</span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <section className="detail-content-section">
              <h2 className="content-section-title">
                <span className="title-icon">📋</span>
                About This Hackathon
              </h2>
              <div className="content-text">
                <p>{hack.description || 'Join us for an exciting hackathon where innovation meets creativity. Compete with the best minds, build amazing projects, and win fantastic prizes!'}</p>
              </div>
            </section>

            {/* Rules & Rounds */}
            <section className="detail-content-section">
              <h2 className="content-section-title">
                <span className="title-icon">🎯</span>
                Rounds
              </h2>
              <div className="content-text">
                <p>{hack.rounds || 'This hackathon consists of multiple rounds designed to test your skills, creativity, and teamwork. Detailed rules will be shared with registered participants.'}</p>
              </div>
            </section>

            {/* Tech Stack */}
            <section className="detail-content-section">
              <h2 className="content-section-title">
                <span className="title-icon">💻</span>
                Tech Stack & Tools
              </h2>
              <div className="tech-tags">
                {(hack.techStack || 'React, Node.js, Python, MongoDB, AWS').split(',').map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech.trim()}</span>
                ))}
              </div>
            </section>
          </article>

          {/* Sidebar Column */}
          <aside className="detail-sidebar-column">
            {/* Event Details Card */}
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Event Details</h3>
              <div className="sidebar-detail-list">
                <div className="sidebar-detail-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <span className="detail-label">Venue</span>
                    <span className="detail-value">{hack.venue || 'To Be Announced'}</span>
                  </div>
                </div>
                
                <div className="sidebar-detail-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <div>
                    <span className="detail-label">Date</span>
                    <span className="detail-value">{hack.date ? new Date(hack.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'TBA'}</span>
                  </div>
                </div>
                
                <div className="sidebar-detail-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <div>
                    <span className="detail-label">Contact</span>
                    <span className="detail-value">{hack.contactNumber || 'N/A'}</span>
                  </div>
                </div>
                
                {hack.link && (
                  <div className="sidebar-detail-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                    <div>
                      <span className="detail-label">Website</span>
                      <a 
                        href={getValidUrl(hack.link)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="detail-link"
                        onClick={(e) => {
                          if (!hack.link || hack.link === '#') {
                            e.preventDefault();
                            alert('Website link not available.');
                          }
                        }}
                      >
                        Visit Official Page
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <a 
                href={getValidUrl(hack.link)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="sidebar-register-btn"
                onClick={handleRegisterClick}
              >
                Register Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>

            {/* Share Card */}
            <div className="sidebar-card share-card">
              <h3 className="sidebar-card-title">Share This Event</h3>
              <div className="share-buttons">
                <button className="share-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="share-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="share-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetail;