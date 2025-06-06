import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyCrewApplication } from "../utils/api";

const Hackathons = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [crewStatus, setCrewStatus] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!user || crewStatus !== "approved") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h2 className="text-2xl font-bold mb-4">Join Crew First</h2>
        <p className="mb-6">
          You must be an approved crew member to view hackathons.
        </p>
        <button
          className="px-6 py-2 bg-white text-black rounded font-bold hover:bg-zinc-200 transition"
          onClick={() => navigate("/joincrew")}
        >
          Join Crew
        </button>
      </div>
    );
  }

  // Approved: show hackathons
  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Hackathons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-[#18181b] rounded-lg shadow-lg p-6 flex flex-col items-center"
          >
            <h2 className="text-xl font-bold mb-2">Hackathon {i}</h2>
            <p className="text-zinc-300 mb-4">
              This is a dummy hackathon card. Details about the event go here.
            </p>
            <button className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-zinc-200 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hackathons;
