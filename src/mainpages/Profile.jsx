import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserAndCrew } from '../utils/api';
import './Profile.css';

const Profile = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [crew, setCrew] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [name, setName] = useState(null);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    getUserAndCrew().then(res => {
      if (res.success) {
        setCrew(res.data.crew);
        setProfileImg(res.data.user.profileImg);
        setName(res.data.user.name);
      }
    });
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="profile-loading-wrapper">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading profile...</p>
      </div>
    );
  }

  const displayImg =
    profileImg ||
    'https://ui-avatars.com/api/?name=' +
      encodeURIComponent(name || user?.name || user?.username || 'User') +
      '&background=6366f1&color=fff&size=200';

  // Use crew details if available, fallback to user fields
  const details = {
    email: user?.email || 'Not set',
    mobileNumber: crew?.mobileNumber || user?.mobileNumber || 'Not set',
    techStack: crew?.techStack || user?.techStack || 'Not set',
    college: crew?.college || user?.college || 'Not set',
    branch: crew?.branch || user?.branch || 'Not set',
    cityState: crew?.cityState || user?.cityState || 'Not set',
    linkedin: crew?.linkedin || user?.linkedin || '',
    github: crew?.github || user?.github || '',
    codingPlatform: crew?.codingPlatform || user?.codingPlatform || '',
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-header-bg">
            <div className="header-gradient"></div>
          </div>
          <div className="profile-header-content">
            <div className="profile-avatar-wrapper">
              <img
                src={displayImg}
                alt="Profile"
                className="profile-avatar-large"
              />
              <div className="avatar-status-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {crew?.status === 'approved' ? 'Verified' : 'Member'}
              </div>
            </div>
            <div className="profile-header-info">
              <h1 className="profile-name">{name || user?.name || user?.username || 'User'}</h1>
              <p className="profile-role">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                {user?.role || 'Member'}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Info Sections */}
          <div className="profile-sections">
            {/* Personal Information */}
            <div className="info-section">
              <h2 className="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Personal Information
              </h2>
              <div className="info-grid">
                <InfoItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  }
                  label="Email"
                  value={details.email}
                />
                <InfoItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  }
                  label="Mobile Number"
                  value={details.mobileNumber}
                />
                <InfoItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  }
                  label="City & State"
                  value={details.cityState}
                />
              </div>
            </div>

            {/* Academic Details */}
            <div className="info-section">
              <h2 className="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
                Academic Details
              </h2>
              <div className="info-grid">
                <InfoItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  }
                  label="College"
                  value={details.college}
                />
                <InfoItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                  }
                  label="Branch"
                  value={details.branch}
                />
              </div>
            </div>

            {/* Technical Skills */}
            <div className="info-section">
              <h2 className="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
                Technical Skills
              </h2>
              <div className="info-grid">
                <InfoItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  }
                  label="Tech Stack"
                  value={details.techStack}
                  fullWidth
                />
              </div>
            </div>

            {/* Social Profiles */}
            <div className="info-section">
              <h2 className="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                Social Profiles
              </h2>
              <div className="info-grid">
                <InfoItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  }
                  label="LinkedIn"
                  value={
                    details.linkedin ? (
                      <a href={details.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link">
                        View Profile
                      </a>
                    ) : (
                      'Not set'
                    )
                  }
                />
                <InfoItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  }
                  label="GitHub"
                  value={
                    details.github ? (
                      <a href={details.github} target="_blank" rel="noopener noreferrer" className="profile-link">
                        View Profile
                      </a>
                    ) : (
                      'Not set'
                    )
                  }
                />
                <InfoItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                    </svg>
                  }
                  label="Coding Platform"
                  value={details.codingPlatform || 'Not set'}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="profile-actions">
            <button className="action-btn-primary" onClick={() => navigate('/update-profile')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit Profile
            </button>
            <button className="action-btn-secondary" onClick={logout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value, fullWidth }) => (
  <div className={`info-item ${fullWidth ? 'info-item-full' : ''}`}>
    <div className="info-item-header">
      <div className="info-icon">{icon}</div>
      <span className="info-label">{label}</span>
    </div>
    <div className="info-value">{value}</div>
  </div>
);

export default Profile;