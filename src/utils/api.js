const API_BASE = "http://localhost:5050/api/v1"; // Change if your backend runs elsewhere

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    credentials: "include", // Important for cookies!
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function register(name, email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function getMe() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

export async function applyToJoinCrew(mobileNumber, message) {
  const res = await fetch("http://localhost:5050/api/v1/crew/apply", {
    method: "POST",
    credentials: "include", // send cookies/JWT
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobileNumber, message }),
  });
  return res.json();
}

export async function getMyCrewApplication() {
  const res = await fetch("http://localhost:5050/api/v1/crew/my", {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}