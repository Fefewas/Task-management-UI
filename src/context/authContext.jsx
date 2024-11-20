import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userID, setUserID] = useState(localStorage.getItem('userID'));

  const login = (token, userID) => {
    setToken(token);
    setUserID(userID);
    localStorage.setItem('token', token);
    localStorage.setItem('userID', userID);
  };

  const logout = () => {
    setToken(null);
    setUserID(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, userID, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

