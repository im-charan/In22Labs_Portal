import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for user data
const UserContext = createContext();

// UserProvider component to provide the user data to child components
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    user_id: null,
    user_type: null,
    org_id: null,
    user_name:null,
  });

  // Function to update user data
  const setUserData = (userData) => {
    setUser(userData); // Update the user data in state
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
  };

  // Function to clear user data
  const clearUserData = () => {
    setUser({
      user_id: null,
      user_type: null,
      org_id: null,
      user_name:null,    }); // Reset to initial state
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  // Effect to check local storage for user data on initial load
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "user") {
        setUser(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
   // Empty dependency array to only run once on component mount

  return (
    <UserContext.Provider value={{ user, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user data, setUserData, and clearUserData
export const useUser = () => useContext(UserContext);
