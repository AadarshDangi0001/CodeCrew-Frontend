import React, { useState, useEffect } from 'react';
import './PageLoader.css';

const PageLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 200);

    // Wait for all images to load
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    const imageLoaded = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        setProgress(100);
      }
    };

    // Add load event listeners to all images
    images.forEach((img) => {
      if (img.complete) {
        imageLoaded();
      } else {
        img.addEventListener('load', imageLoaded);
        img.addEventListener('error', imageLoaded); // Count errors as loaded too
      }
    });

    // Fallback: Remove loader after maximum time
    const maxWaitTime = setTimeout(() => {
      setProgress(100);
    }, 5000);

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      setTimeout(() => setProgress(100), 500);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => setProgress(100), 300);
      });
    }

    // Cleanup
    return () => {
      clearInterval(progressInterval);
      clearTimeout(maxWaitTime);
      images.forEach((img) => {
        img.removeEventListener('load', imageLoaded);
        img.removeEventListener('error', imageLoaded);
      });
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }, 300);
    }
  }, [progress]);

  if (!loading) return children;

  return (
    <>
      <div className={`page-loader ${fadeOut ? 'fade-out' : ''}`}>
        <div className="loader-container">
          {/* Logo */}
          <div className="loader-logo">
            <img src="/CodeCrewLogo2.png" alt="Code Crew" />
          </div>

          {/* Loading Text */}
          <div className="loader-text">
            <h2>Code Crew</h2>
            <p>Loading your experience...</p>
          </div>

          {/* Progress Bar */}
          <div className="loader-progress-wrapper">
            <div className="loader-progress-bar">
              <div 
                className="loader-progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="loader-percentage">{Math.round(progress)}%</span>
          </div>

          {/* Animated Dots */}
          <div className="loader-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        {/* Background Animation */}
        <div className="loader-bg-animation">
          <div className="loader-circle circle-1"></div>
          <div className="loader-circle circle-2"></div>
          <div className="loader-circle circle-3"></div>
        </div>
      </div>
      
      {/* Render children hidden while loading */}
      <div style={{ display: loading ? 'none' : 'block' }}>
        {children}
      </div>
    </>
  );
};

export default PageLoader;
