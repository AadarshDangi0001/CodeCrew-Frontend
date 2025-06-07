import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHackathons } from "../utils/api";
import "./Hackathons.css";

const HackathonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hack, setHack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHackathons().then((res) => {
      if (res.success) {
        const found = res.data.find((h) => h._id === id);
        setHack(found || null);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="hackathons-loading">Loading...</div>;
  if (!hack) return <div className="hackathons-loading">Hackathon not found.</div>;

  return (
    <div className="hackathons-container">
      <button className="hackathon-details-btn" onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
        &larr; Back
      </button>
      <div className="hackathon-card" style={{ maxWidth: 500, margin: "0 auto" }}>
        <h2 className="hackathon-name">{hack.name}</h2>
        <div className="hackathon-info">
          <div><b>Venue:</b> {hack.venue}</div>
          <div><b>Prize Pool:</b> {hack.prizePool}</div>
          <div><b>Date:</b> {hack.date ? new Date(hack.date).toLocaleDateString() : "N/A"}</div>
          <div><b>Contact:</b> {hack.contactNumber}</div>
          <div><b>Rounds:</b> {hack.rounds}</div>
          <div><b>Entry Fee:</b> {hack.entryFee}</div>
          <div><b>Tech Stack:</b> {hack.techStack}</div>
          <div><b>Link:</b> <a href={hack.link} target="_blank" rel="noopener noreferrer">{hack.link}</a></div>
        </div>
        <div style={{ margin: "18px 0" }}>
          <b>Description:</b>
          <div style={{ marginTop: 6 }}>{hack.description}</div>
        </div>
        {hack.image && <img src={hack.image} alt="" style={{ width: "100%", borderRadius: 8, marginTop: 12 }} />}
      </div>
    </div>
  );
};

export default HackathonDetail;