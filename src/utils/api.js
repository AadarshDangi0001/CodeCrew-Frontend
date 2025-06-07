const API_BASE = "http://localhost:5050/api/v1";

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    credentials: "include",
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
    if (!res.ok) return { success: false, data: null };
    return await res.json();
  } catch {
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
  message
) {
  const res = await fetch(`${API_BASE}/crew/apply`, {
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
      message,
    }),
  });
  return res.json();
}

export async function getMyCrewApplication() {
  const res = await fetch(`${API_BASE}/crew/my`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

export async function updateProfile(formData) {
  // formData: FormData object (for file upload)
  const res = await fetch(`${API_BASE}/user/update`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });
  return res.json();
}

export async function updateCrewDetails(data) {
  // data: plain object
  const res = await fetch(`${API_BASE}/crew/update`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Add this for /user/me
export async function getUserAndCrew() {
  try {
    const res = await fetch(`${API_BASE}/user/me`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) return { success: false, data: null };
    return await res.json();
  } catch {
    return { success: false, data: null };
  }
}