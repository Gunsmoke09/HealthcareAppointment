import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // will hold { token, ... }

  // Restore login after refresh
  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("auth", JSON.stringify(userData));
    if (userData?.token) {
      localStorage.setItem("token", userData.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!user?.token;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
