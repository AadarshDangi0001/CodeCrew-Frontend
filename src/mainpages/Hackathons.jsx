import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyCrewApplication, getHackathons } from "../utils/api";
import "./Hackathons.css";

const Hackathons = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [crewStatus, setCrewStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hackathons, setHackathons] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'saved'
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'date', 'name', 'prize'
  const [filterVenue, setFilterVenue] = useState('all'); // 'all' or specific venue

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    getMyCrewApplication().then((res) => {
      if (res.success && res.data) {
        setCrewStatus(res.data.status);
      } else {
        setCrewStatus(null);
      }
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {
    if (crewStatus === "approved") {
      getHackathons().then((res) => {
        if (res.success) setHackathons(res.data);
      });
      loadSavedEvents();
    }
  }, [crewStatus]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadSavedEvents = () => {
    const saved = JSON.parse(localStorage.getItem('savedHackathons') || '[]');
    setSavedEvents(saved);
  };

  // Refresh saved events when tab changes
  useEffect(() => {
    if (activeTab === 'saved') {
      loadSavedEvents();
    }
  }, [activeTab]);

  const getDisplayedHackathons = () => {
    let events = activeTab === 'saved' ? savedEvents : hackathons;

    // Apply venue filter
    if (filterVenue !== 'all') {
      events = events.filter(h => h.venue === filterVenue);
    }

    // Apply sorting
    const sorted = [...events].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          // Sort by event date (newest event date first)
          return new Date(b.date || 0) - new Date(a.date || 0);
        case 'recent':
          // Sort by when hackathon was added to database (most recently added first)
          // Using _id or createdAt if available, otherwise reverse array order
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          // If no createdAt, assume later items in array are more recent
          return events.indexOf(b) - events.indexOf(a);
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'prize':
          const prizeA = parseInt((a.prizePool || '0').replace(/[^0-9]/g, '')) || 0;
          const prizeB = parseInt((b.prizePool || '0').replace(/[^0-9]/g, '')) || 0;
          return prizeB - prizeA;
        default:
          return 0;
      }
    });

    return sorted;
  };

  const getUniqueVenues = () => {
    const venues = hackathons.map(h => h.venue).filter(v => v && v !== 'TBA');
    return [...new Set(venues)];
  };

  const displayedHackathons = getDisplayedHackathons();
  const uniqueVenues = getUniqueVenues();

  if (loading) {
    return (
      <div className="hackathons-loading-wrapper">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading hackathons...</p>
      </div>
    );
  }

  if (!user || crewStatus !== "approved") {
    return (
      <div className="hackathons-gate-wrapper">
        <div className="gate-content">
          <div className="gate-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h2 className="gate-title">Join Code Crew First</h2>
          <p className="gate-description">
            You must be an approved crew member to access exclusive hackathons, workshops, and competitions.
          </p>
          <button
            className="gate-join-btn"
            onClick={() => navigate("/joincrew")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            Join Code Crew
          </button>
        </div>
      </div>
    );
  }

  // Approved: show hackathons
  return (
    <div className="hackathons-page">
      {/* Hero Section */}
      <section className="hackathons-hero-section">
        <div className="hero-bg-gradient"></div>
        <div className="hackathons-hero-content">
          <div className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Exclusive Access
          </div>
          <h1 className="hackathons-hero-title">Discover Hackathons</h1>
          <p className="hackathons-hero-subtitle">
            Join cutting-edge competitions, showcase your skills, and win exciting prizes
          </p>
          <div className="hero-stats">
            <div className="hero-stat-item">
              <div className="stat-number">{hackathons.length}</div>
              <div className="stat-label">Active Events</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-item">
              <div className="stat-number">₹1L+</div>
              <div className="stat-label">Total Prizes</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Participants</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hackathons Grid */}
      <section className="hackathons-content-section">
        <div className="hackathons-container">
          {/* Tabs and Filters */}
          <div className="hackathons-controls">
            {/* Tabs */}
            <div className="hackathons-tabs">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                All Events ({hackathons.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'saved' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('saved')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                Saved ({savedEvents.length})
              </button>
            </div>

            {/* Filters */}
            <div className="hackathons-filters">
              <div className="filter-group">
                <label className="filter-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M7 12h10M11 18h2"/>
                  </svg>
                  Sort by:
                </label>
                <select 
                  className="filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recent">Recently Added</option>
                  <option value="date">Event Date</option>
                  <option value="name">Name</option>
                  <option value="prize">Prize Pool</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Venue:
                </label>
                <select 
                  className="filter-select"
                  value={filterVenue}
                  onChange={(e) => setFilterVenue(e.target.value)}
                >
                  <option value="all">All Venues</option>
                  {uniqueVenues.map((venue, idx) => (
                    <option key={idx} value={venue}>{venue}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {displayedHackathons.length === 0 ? (
            <div className="no-hackathons-state">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {activeTab === 'saved' ? (
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </>
                )}
              </svg>
              <h3>{activeTab === 'saved' ? 'No Saved Events' : 'No Hackathons Available'}</h3>
              <p>
                {activeTab === 'saved' 
                  ? 'Save hackathons you\'re interested in to see them here'
                  : 'Check back soon for upcoming events and competitions'}
              </p>
            </div>
          ) : (
            <div className="hackathons-grid">
              {displayedHackathons.map((hack) => (
                <article key={hack._id} className="hackathon-card-modern">
                  {/* Card Image */}
                  <div className="card-image-wrapper">
                    <img 
                      src={hack.image || '/CodeCrewLogo2.png'} 
                      alt={hack.name} 
                      className="card-bg-image" 
                    />
                    <div className="card-image-overlay"></div>
                    
                    {/* Featured Badge */}
                    {hack.featured && (
                      <div className="card-featured-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="card-content-wrapper">
                    <h3 className="card-title">{hack.name}</h3>
                    <p className="card-description">
                      {hack.description 
                        ? hack.description.slice(0, 85) + (hack.description.length > 85 ? '...' : '') 
                        : 'Join this hackathon and showcase your innovative skills.'}
                    </p>

                    {/* Meta Info */}
                    <div className="card-meta-grid">
                      <div className="meta-info-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span>{hack.date ? new Date(hack.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBA'}</span>
                      </div>
                      
                      <div className="meta-info-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>{hack.venue || 'TBA'}</span>
                      </div>
                      
                      <div className="meta-info-item prize-meta">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                          <path d="M4 22h16"/>
                          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                        </svg>
                        <span>{hack.prizePool || 'TBA'}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      className="card-view-btn"
                      onClick={() => navigate(`/hackathon-detail/${hack._id}`)}
                    >
                      View Details
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hackathons;
