import React, { createContext, useContext, useState, useEffect } from "react";
import { getMe, login as apiLogin } from "../utils/api"; // import your API helpers

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if user is authenticated via backend
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const res = await getMe();
        if (res.success && res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  // Login function: calls backend, sets user if successful
  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    if (res.success && res.token) {
      // After login, fetch user info
      const me = await getMe();
      if (me.success && me.data) {
        setUser(me.data);
      }
    }
    return res;
  };

  // Logout function: clear user and optionally call backend logout
  const logout = async () => {
    await fetch("http://localhost:5050/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);