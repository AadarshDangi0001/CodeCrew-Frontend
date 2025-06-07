import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import CodeCrewSmall from '../assets/CodeCrewSmall.png'
import { useAuth } from '../context/AuthContext'
import { getUserAndCrew, getMyCrewApplication } from '../utils/api'

// Simple SVG for a profile icon:


// Hamburger menu icon
const MenuIcon = ({ open }) => (
  <div style={{ width: 32, height: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer' }}>
    <span style={{
      height: 3, width: 28, background: '#fff', margin: '3px 0', borderRadius: 2, transition: '0.3s',
      transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none'
    }} />
    <span style={{
      height: 3, width: 28, background: '#fff', margin: '3px 0', borderRadius: 2, opacity: open ? 0 : 1, transition: '0.3s'
    }} />
    <span style={{
      height: 3, width: 28, background: '#fff', margin: '3px 0', borderRadius: 2, transition: '0.3s',
      transform: open ? 'rotate(-45deg) translate(7px, -7px)' : 'none'
    }} />
  </div>
);

const Navbar = () => {
  const { user } = useAuth();
  const [crewStatus, setCrewStatus] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getMyCrewApplication().then(res => {
        if (res.success && res.data) {
          setCrewStatus(res.data.status);
        } else {
          setCrewStatus(null);
        }
        setLoading(false);
      });
    } else {
      setCrewStatus(null);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getUserAndCrew().then(res => {
        if (res.success) setProfileImg(res.data.user.profileImg);
        setLoading(false);
      });
    } else {
      setProfileImg(null);
    }
  }, [user]);

  // Helper to check if navlink is active
  const isActive = (path) => location.pathname === path;

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowNavbar(true);
        lastScrollY.current = window.scrollY;
        return;
      }
      if (window.scrollY > lastScrollY.current) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className={`navbar${showNavbar ? ' navbar-visible' : ' navbar-hidden'}`}
        style={{ background: "#000" }}
      >
        <div className="navright">
          <div className="navlogo">
            <Link to="/">
              <img src={CodeCrewSmall} alt="" />
            </Link>
          </div>
        </div>
        {/* Hamburger menu for mobile */}
        <div className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <MenuIcon open={sidebarOpen} />
        </div>
        {/* Desktop nav */}
        <div className="navleft desktop-nav">
          <div className="navlinks">
            <Link to="/"><h1 className={isActive("/") ? "nav-active" : ""}>Home</h1></Link>
            <Link to="/about"><h1 className={isActive("/about") ? "nav-active" : ""}>About</h1></Link>
            <Link to="/contact"><h1 className={isActive("/contact") ? "nav-active" : ""}>Contact</h1></Link>
            <Link to="/hackathons"><h1 className={isActive("/hackathons") ? "nav-active" : ""}>Hackathons</h1></Link>
            <Link to="/crew"><h1 className={isActive("/crew") ? "nav-active" : ""}>Crew</h1></Link>
          </div>
          <div className="navbutton">
            <div className="b1">
              {(!crewStatus || crewStatus !== "approved") && !loading && (
                <Link to="/joincrew">
                  <nav>
                    <ul>
                      <li className="btnnav" style={{ background: "#000", color: "#fff" }}>
                        JOIN CREW
                        <span></span><span></span><span></span><span></span>
                      </li>
                    </ul>
                  </nav>
                </Link>
              )}
              {loading && (
                <div style={{ color: "#fff", padding: "0.5rem 1rem" }}>Loading...</div>
              )}
            </div>
            <div className="b2">
              {user ? (
                <Link to="/profile">
                  <div className="profile flex items-center justify-center" title="Profile">
                    {loading ? (
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: "#222",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: 18,
                        }}
                      >
                        ...
                      </div>
                    ) : (
                      <img
                        src={
                          profileImg ||
                          "https://ui-avatars.com/api/?name=" +
                            encodeURIComponent(user?.name || user?.username || "User") +
                            "&background=18181b&color=fff&size=128"
                        }
                        alt="Profile"
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          objectFit: "cover",
                          background: "#18181b"
                        }}
                      />
                    )}
                  </div>
                </Link>
              ) : (
                <Link to="/login">
                  <nav>
                    <ul>
                      <li className="btnnav" style={{ background: "#000", color: "#fff" }}>
                        LOGIN
                        <span></span><span></span><span></span><span></span>
                      </li>
                    </ul>
                  </nav>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar for mobile */}
      <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-logo">
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              <img src={CodeCrewSmall} alt="" />
            </Link>
          </div>
          <div className="sidebar-links">
            <Link to="/"><h1 className={isActive("/") ? "nav-active" : ""}>Home</h1></Link>
            <Link to="/about"><h1 className={isActive("/about") ? "nav-active" : ""}>About</h1></Link>
            <Link to="/contact"><h1 className={isActive("/contact") ? "nav-active" : ""}>Contact</h1></Link>
            <Link to="/hackathons"><h1 className={isActive("/hackathons") ? "nav-active" : ""}>Hackathons</h1></Link>
            <Link to="/crew"><h1 className={isActive("/crew") ? "nav-active" : ""}>Crew</h1></Link>
            {(!crewStatus || crewStatus !== "approved") && (
              <Link to="/joincrew">
                <div className="sidebar-btnnav">
                  JOIN CREW
                </div>
              </Link>
            )}
            {user ? (
              <Link to="/profile">
                <div className="sidebar-profile" title="Profile">
                 
                  <span style={{ marginLeft: 8, color: "#fff" }}>Profile</span>
                </div>
              </Link>
            ) : (
              <Link to="/login">
                <div className="sidebar-btnnav">
                  LOGIN
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
