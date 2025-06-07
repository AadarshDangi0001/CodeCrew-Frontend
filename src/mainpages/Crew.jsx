import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyCrewApplication } from "../utils/api";

const dummyMessages = [
  { from: "Alice", text: "Hey team! Ready for the hackathon?" },
  { from: "Bob", text: "Absolutely! Let's win this 🚀" },
  { from: "You", text: "I'm excited too! Let's go!" },
];

const Crew = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [crewStatus, setCrewStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    getMyCrewApplication().then(res => {
      if (res.success && res.data) {
        setCrewStatus(res.data.status);
      } else {
        setCrewStatus(null);
      }
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
        <p className="mb-6">You must be an approved crew member to access the Crew Chat.</p>
        <button
          className="px-6 py-2 bg-white text-black rounded font-bold hover:bg-zinc-200 transition"
          onClick={() => navigate("/joincrew")}
        >
          Join Crew
        </button>
      </div>
    );
  }

  // Approved: show chat area
  return (
    <div className="min-h-screen bg-black flex flex-col items-center  mt-20 py-10 px-2">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">Crew Chat</h1>
      <div
        className="w-full max-w-lg flex flex-col flex-1 rounded-lg shadow-lg"
        style={{
         
          Height: "70vh",
         
          overflow: "hidden",
        }}
      >
        <div
          className="flex-1 overflow-y-auto p-4"
          style={{ minHeight: "50vh", maxHeight: "65vh" }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 flex ${msg.from === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs ${
                  msg.from === "You"
                    ? "bg-green-600 text-white"
                    : "bg-zinc-800 text-white"
                }`}
              >
                <span className="block text-xs font-semibold mb-1">{msg.from}</span>
                <span>{msg.text}</span>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form
          className="flex items-center p-4 border-t border-zinc-700 bg-[#18181b]"
          onSubmit={e => {
            e.preventDefault();
            if (input.trim()) {
              setMessages([...messages, { from: "You", text: input }]);
              setInput("");
            }
          }}
        >
          <input
            type="text"
            className="flex-1 p-2 rounded bg-zinc-900 text-white outline-none border border-zinc-700"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Crew;