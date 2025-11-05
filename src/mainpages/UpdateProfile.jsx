import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserAndCrew, updateProfile, updateCrewDetails } from "../utils/api";
import './Profile.css';

const UpdateProfile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    profileImg: "",
    mobileNumber: "",
    techStack: "",
    college: "",
    branch: "",
    cityState: "",
    linkedin: "",
    github: "",
    codingPlatform: "",
  });
  const [crewId, setCrewId] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [crewStatus, setCrewStatus] = useState("approved"); // default to approved

  useEffect(() => {
    getUserAndCrew().then(res => {
      if (res.success) {
        const { user: u, crew } = res.data;
        setForm({
          name: u.name || "",
          email: u.email || "",
          profileImg: u.profileImg || "",
          mobileNumber: crew?.mobileNumber || "",
          techStack: crew?.techStack || "",
          college: crew?.college || "",
          branch: crew?.branch || "",
          cityState: crew?.cityState || "",
          linkedin: crew?.linkedin || "",
          github: crew?.github || "",
          codingPlatform: crew?.codingPlatform || "",
        });
        setCrewId(crew?._id || null);
        setCrewStatus(crew?.status || "not_applied");
      }
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setImgFile(file);
    if (file) {
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(f => ({ ...f, profileImg: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);

    // Update user (with profile image)
    const { name, email } = form;
    const profileImgFile = imgFile;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (profileImgFile) formData.append("profileImg", profileImgFile);
    const result = await updateProfile(formData);
    if (!result.success) {
      alert(result.message || "Profile update failed");
      setSaving(false);
      return;
    }

    // Update crew details
    if (crewId) {
      await updateCrewDetails({
        mobileNumber: form.mobileNumber,
        techStack: form.techStack,
        college: form.college,
        branch: form.branch,
        cityState: form.cityState,
        linkedin: form.linkedin,
        github: form.github,
        codingPlatform: form.codingPlatform,
      });
    }

    setSaving(false);
    alert("Profile updated successfully!");
    navigate("/profile", { replace: true });
  };

  if (loading) {
    return (
      <div className="profile-loading-wrapper">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  const notApproved = crewStatus !== "approved";

  return (
    <div className="update-profile-wrapper">
      <div className="update-profile-container">
        {/* Header */}
        <div className="update-profile-header">
          <button className="back-button" onClick={() => navigate("/profile")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Profile
          </button>
          <div className="update-header-content">
            <div className="update-icon-badge">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <div>
              <h1 className="update-title">Edit Profile</h1>
              <p className="update-subtitle">Update your personal information and credentials</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="update-profile-form" encType="multipart/form-data">
          {/* Basic Information */}
          <div className="form-section">
            <h3 className="section-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Basic Information
            </h3>
            
            {/* Profile Image */}
            <div className="profile-image-upload">
              <div className="current-profile-preview">
                <img
                  src={form.profileImg || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(form.name || 'User') + '&background=6366f1&color=fff&size=160'}
                  alt="Profile Preview"
                  className="preview-avatar"
                />
                <div className="upload-overlay">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input-hidden"
                id="profile-image-upload"
              />
              <label htmlFor="profile-image-upload" className="upload-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Upload New Photo
              </label>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label className="field-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your full name"
                />
              </div>

              <div className="form-field">
                <label className="field-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Conditional Crew Details */}
          {notApproved ? (
            <div className="crew-gate-card">
              <div className="gate-icon-circle">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="gate-title">Join Code Crew to Unlock</h3>
              <p className="gate-message">
                Become a verified member to access additional profile fields and exclusive features.
              </p>
              <button
                type="button"
                className="gate-join-button"
                onClick={() => navigate('/joincrew')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Join Code Crew
              </button>
            </div>
          ) : (
            <>
              {/* Personal Details */}
              <div className="form-section">
                <h3 className="section-heading">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Contact Information
                </h3>
                
                <div className="form-grid">
                  <div className="form-field">
                    <label className="field-label">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={form.mobileNumber}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your mobile number"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">City & State</label>
                    <input
                      type="text"
                      name="cityState"
                      value={form.cityState}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Details */}
              <div className="form-section">
                <h3 className="section-heading">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                  Academic Information
                </h3>
                
                <div className="form-grid">
                  <div className="form-field">
                    <label className="field-label">College/University</label>
                    <input
                      type="text"
                      name="college"
                      value={form.college}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your institution"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Branch/Major</label>
                    <input
                      type="text"
                      name="branch"
                      value={form.branch}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                </div>
              </div>

              {/* Technical & Social */}
              <div className="form-section">
                <h3 className="section-heading">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                  Technical & Social Links
                </h3>
                
                <div className="form-field">
                  <label className="field-label">Tech Stack</label>
                  <input
                    type="text"
                    name="techStack"
                    value={form.techStack}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., MERN, Python, Java"
                  />
                </div>

                <div className="form-grid">
                  <div className="form-field">
                    <label className="field-label">LinkedIn Profile</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={form.linkedin}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="LinkedIn URL"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">GitHub Profile</label>
                    <input
                      type="url"
                      name="github"
                      value={form.github}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="GitHub URL"
                    />
                  </div>

                  <div className="form-field form-field-full">
                    <label className="field-label">Coding Platform Profile</label>
                    <input
                      type="text"
                      name="codingPlatform"
                      value={form.codingPlatform}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="LeetCode / Codeforces / HackerRank"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Submit Buttons */}
          <div className="form-submit-section">
            <button
              type="submit"
              className="submit-btn-modern"
              disabled={saving}
            >
              {saving ? (
                <>
                  <div className="btn-spinner"></div>
                  Saving Changes...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;