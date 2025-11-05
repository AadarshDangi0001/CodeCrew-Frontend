import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../utils/api';
import './Profile.css';

const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserById(id).then(res => {
      if (res.success) {
        setProfileData(res.data);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="profile-loading-wrapper">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading profile...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profile-loading-wrapper">
        <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>User not found</h2>
        <button onClick={() => navigate(-1)} className="action-btn-primary" style={{ marginTop: '1rem' }}>
          Go Back
        </button>
      </div>
    );
  }

  const displayImg =
    profileData.profileImg ||
    'https://ui-avatars.com/api/?name=' +
      encodeURIComponent(profileData.name || profileData.username || 'User') +
      '&background=6366f1&color=fff&size=160';

  const InfoItem = ({ icon, label, value, isLink = false }) => (
    <div className="info-item">
      <div className="info-icon">{icon}</div>
      <div className="info-content">
        <span className="info-label">{label}</span>
        {isLink && value && value !== 'Not provided' ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="info-value-link">
            {value}
          </a>
        ) : (
          <span className="info-value">{value || 'Not provided'}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="profile-wrapper">
      {/* Back Button */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', paddingTop: '100px' }}>
        <button className="back-button" onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
      </div>

      {/* Profile Header */}
      <div className="profile-header-bg"></div>
      
      <div className="profile-container">
        <div className="profile-header">
          {/* Avatar */}
          <div className="avatar-wrapper">
            <img
              src={displayImg}
              alt={profileData.name || 'User'}
              className="profile-avatar-large"
            />
            <div className="avatar-status-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>

          {/* Header Content */}
          <div className="profile-header-content">
            <h1>{profileData.name || profileData.username || 'User'}</h1>
            <div className="role-badge">
              {profileData.role === 'admin' ? '👑 Admin' : '👤 Member'}
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="info-sections-grid">
          {/* Personal Information */}
          <div className="info-section">
            <h2>
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
                value={profileData.email}
              />
              <InfoItem
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                }
                label="Mobile"
                value={profileData.mobileNumber}
              />
              <InfoItem
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                }
                label="Location"
                value={profileData.cityState}
              />
            </div>
          </div>

          {/* Academic Details */}
          <div className="info-section">
            <h2>
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
                value={profileData.college}
              />
              <InfoItem
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                }
                label="Branch"
                value={profileData.branch}
              />
            </div>
          </div>

          {/* Technical Skills */}
          <div className="info-section">
            <h2>
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
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                }
                label="Tech Stack"
                value={profileData.techStack}
              />
              <InfoItem
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                }
                label="Coding Platform"
                value={profileData.codingPlatform}
              />
            </div>
          </div>

          {/* Social Profiles */}
          <div className="info-section">
            <h2>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z"/>
                <path d="M8 12h8M12 8v8"/>
              </svg>
              Social Profiles
            </h2>
            <div className="info-grid">
              <InfoItem
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                }
                label="LinkedIn"
                value={profileData.linkedin}
                isLink={true}
              />
              <InfoItem
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                }
                label="GitHub"
                value={profileData.github}
                isLink={true}
              />
            </div>
          </div>

          {/* Additional Info (if message exists) */}
          {profileData.message && (
            <div className="info-section" style={{ gridColumn: '1 / -1' }}>
              <h2>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Message
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                {profileData.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;