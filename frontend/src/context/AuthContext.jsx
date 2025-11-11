import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../lib/axios";

// Create context
export const AuthContext = createContext(null);

// ✅ Custom hook for accessing auth anywhere
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  // Keep token synced with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Keep user synced with localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const register = async ({ username, email, password }) => {
    const res = await api.post("/auth/register", { username, email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const login = async ({ email, password }) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  // ✅ Proper logout clears everything
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
