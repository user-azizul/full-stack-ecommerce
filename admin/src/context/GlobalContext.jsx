import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { successNotification } from "./../util/showNotification";

const GlobalContext = createContext(null);

function GlobalContextProvider({ children }) {
  const backendUrl = "http://localhost:8000/api";
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
  );
  function logout() {
    setToken("");
    localStorage.removeItem("adminToken");
    successNotification("Logged Out");
  }
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");

    if (savedToken) {
      // Decode token to get expiration time
      const decodedToken = jwtDecode(savedToken);

      // Check if token is expired
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp < currentTime) {
        // Token expired, redirect to login
        localStorage.removeItem("userToken");
        setToken("");
      } else {
        setToken(savedToken);
      }
    }
  }, [token]);
  return (
    <GlobalContext.Provider value={{ token, setToken, logout, backendUrl }}>
      {children}
    </GlobalContext.Provider>
  );
}
export default GlobalContextProvider;

export function userGlobalContext() {
  return useContext(GlobalContext);
}
