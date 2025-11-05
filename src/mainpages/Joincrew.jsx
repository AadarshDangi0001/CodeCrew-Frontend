import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { applyToJoinCrew, getMyCrewApplication } from '../utils/api';
import './Joincrew.css';
// We'll initiate Razorpay payment inline after creating the application

const Joincrew = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [techStack, setTechStack] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [cityState, setCityState] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [codingPlatform, setCodingPlatform] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect to /hackathons if status is approved
  useEffect(() => {
    if (user) {
      getMyCrewApplication().then(res => {
        if (res.success && res.data && res.data.status === "approved") {
          navigate("/hackathons");
        }
      });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await applyToJoinCrew(
      mobile,
      techStack,
      college,
      branch,
      cityState,
      linkedin,
      github,
      codingPlatform,
      message
    );
    setLoading(false);
    if (result.success) {
      // Application created (status pending). Now create a Razorpay order and charge ₹19.
      try {
        const orderRes = await fetch('http://localhost:5050/api/v1/payment/create-order', {
          method: 'POST',
          credentials: 'include'
        });
        const order = await orderRes.json();

        // Dynamically load Razorpay checkout script if not already loaded
        const loadRazorpay = () => {
          return new Promise((resolve, reject) => {
            if (window.Razorpay) return resolve(true);
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error('Razorpay SDK failed to load'));
            document.body.appendChild(script);
          });
        };

        await loadRazorpay();

        const options = {
          key: 'rzp_test_Rc1u5Zk1zG5m3t', // test key, replace with env variable if needed
          amount: order.amount,
          currency: order.currency,
          name: 'Code Crew',
          description: 'Crew application fee',
          order_id: order.id,
          handler: async function (response) {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
            try {
              const verifyRes = await fetch('http://localhost:5050/api/v1/payment/verify', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpayOrderId: razorpay_order_id,
                  razorpayPaymentId: razorpay_payment_id,
                  signature: razorpay_signature,
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyRes.ok) {
                alert('Payment successful! Your crew application is approved.');
                // refresh global user state so navbar updates immediately
                try {
                  await refreshUser();
                } catch (e) {
                  console.warn('refreshUser failed', e);
                }
                // reset form fields
                setMobile('');
                setTechStack('');
                setCollege('');
                setBranch('');
                setCityState('');
                setLinkedin('');
                setGithub('');
                setCodingPlatform('');
                setMessage('');
                navigate('/hackathons');
              } else {
                alert(verifyData.error || 'Payment verification failed');
              }
            } catch (err) {
              console.error(err);
              alert('Payment verification failed');
            }
          },
          prefill: {
            name: (user && user.name) || '',
            email: (user && user.email) || '',
            contact: (user && user.mobile) || ''
          },
          theme: {
            color: '#3399cc'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error('Order creation or payment failed', err);
        alert('Payment initiation failed. Please try again.');
      }
    } else {
      alert(result.error || "Failed to submit application.");
    }
  };

  if (!user) {
    return (
      <div className="join-crew-gate-wrapper">
        <div className="gate-content-modern">
          <div className="gate-icon-large">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h2 className="gate-title-large">Authentication Required</h2>
          <p className="gate-description-large">
            Please log in to your account to join the Code Crew and access exclusive opportunities.
          </p>
          <button
            className="gate-login-btn"
            onClick={() => navigate('/login')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="join-crew-wrapper">
      <div className="join-crew-container">
        {/* Header Section */}
        <div className="join-crew-header">
          <div className="header-icon-badge">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h1 className="join-crew-title">Join Code Crew</h1>
          <p className="join-crew-subtitle">
            Become a verified member and unlock access to exclusive hackathons, workshops, and networking opportunities
          </p>
        </div>

        {/* Payment Notice Card */}
        <div className="payment-notice-card">
          <div className="notice-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </div>
          <div className="notice-content">
            <h3 className="notice-title">Verification Fee</h3>
            <p className="notice-description">
              A nominal registration fee of <strong>₹19</strong> is required to ensure genuine membership and maintain the quality of our community. This one-time payment helps us verify legitimate members and provide you with premium access to all events.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="join-crew-form">
          <div className="form-section">
            <h3 className="section-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Personal Information
            </h3>
            
            <div className="form-grid">
              <div className="form-field">
                <label className="field-label">
                  Mobile Number <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    required
                    className="form-input"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="field-label">
                  City & State <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <input
                    type="text"
                    value={cityState}
                    onChange={e => setCityState(e.target.value)}
                    required
                    className="form-input"
                    placeholder="City, State"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              Academic Details
            </h3>
            
            <div className="form-grid">
              <div className="form-field">
                <label className="field-label">
                  College/University <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={e => setCollege(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Your institution name"
                />
              </div>

              <div className="form-field">
                <label className="field-label">
                  Branch/Major <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={branch}
                  onChange={e => setBranch(e.target.value)}
                  required
                  className="form-input"
                  placeholder="e.g., Computer Science"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              Technical Skills
            </h3>
            
            <div className="form-field">
              <label className="field-label">
                Tech Stack <span className="required">*</span>
              </label>
              <input
                type="text"
                value={techStack}
                onChange={e => setTechStack(e.target.value)}
                required
                className="form-input"
                placeholder="e.g., MERN, Python, Java, React"
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              Social Profiles (Optional)
            </h3>
            
            <div className="form-grid">
              <div className="form-field">
                <label className="field-label">LinkedIn Profile</label>
                <div className="input-with-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={e => setLinkedin(e.target.value)}
                    className="form-input"
                    placeholder="LinkedIn profile URL"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="field-label">GitHub Profile</label>
                <div className="input-with-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <input
                    type="url"
                    value={github}
                    onChange={e => setGithub(e.target.value)}
                    className="form-input"
                    placeholder="GitHub profile URL"
                  />
                </div>
              </div>

              <div className="form-field form-field-full">
                <label className="field-label">Coding Platform Profile</label>
                <input
                  type="text"
                  value={codingPlatform}
                  onChange={e => setCodingPlatform(e.target.value)}
                  className="form-input"
                  placeholder="LeetCode / Codeforces / HackerRank username"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Additional Information
            </h3>
            
            <div className="form-field">
              <label className="field-label">Message (Optional)</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="form-textarea"
                placeholder="Tell us why you want to join Code Crew..."
                rows="4"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-submit-section">
            <button
              type="submit"
              className="submit-btn-modern"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  Processing...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  Submit Application & Pay ₹19
                </>
              )}
            </button>
            <p className="submit-note">
              By submitting, you agree to our terms and conditions. Your payment will be processed securely via Razorpay.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Joincrew;
