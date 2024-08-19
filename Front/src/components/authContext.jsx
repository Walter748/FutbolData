import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuth({ token });
    }
  }, []);

  const login = (token) => {
    setAuth({ token });
    Cookies.set("token", token, { expires: 1 });
  };

  const logout = () => {
    setAuth(null);
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
