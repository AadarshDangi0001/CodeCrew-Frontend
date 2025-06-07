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
    }
  }, [crewStatus]);

  if (loading) {
    return (
      <div className="hackathons-loading">
        Loading...
      </div>
    );
  }

  if (!user || crewStatus !== "approved") {
    return (
      <div className="hackathons-joincrew">
        <h2>Join Crew First</h2>
        <p>You must be an approved crew member to view hackathons.</p>
        <button
          className="hackathons-joincrew-btn"
          onClick={() => navigate("/joincrew")}
        >
          Join Crew
        </button>
      </div>
    );
  }

  // Approved: show hackathons
  return (
    <div className="hackathons-container">
      <h1 className="hackathons-title">Hackathons</h1>
      <div className="hackathons-grid">
        {hackathons.length === 0 && <div>No hackathons found.</div>}
        {hackathons.map((hack) => (
          <div
            key={hack._id}
            className="hackathon-card"
          >
            <h2 className="hackathon-name">{hack.name}</h2>
            <div className="hackathon-info">
              <div><b>Venue:</b> {hack.venue}</div>
              <div><b>Prize:</b> {hack.prizePool}</div>
              <div><b>Date:</b> {hack.date ? new Date(hack.date).toLocaleDateString() : "N/A"}</div>
            </div>
            <button
              className="hackathon-details-btn"
              onClick={() => navigate(`/hackathon-detail/${hack._id}`)}
            >
              Show Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hackathons;
