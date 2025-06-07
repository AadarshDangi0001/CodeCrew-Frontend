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
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      // If unauthorized or any error, return a safe value
      return { success: false, data: null };
    }
    return await res.json();
  } catch (err) {
    // Network or other error, return a safe value
    return { success: false, data: null };
  }
}

export async function applyToJoinCrew(
  mobileNumber,
  techStack,
  college,
  branch,
  cityState,
  linkedin,
  github,
  codingPlatform,
  message // add this
) {
  const res = await fetch("http://localhost:5050/api/v1/crew/apply", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mobileNumber,
      techStack,
      college,
      branch,
      cityState,
      linkedin,
      github,
      codingPlatform,
      message // add this
    }),
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