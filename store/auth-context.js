import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { USER_DATA } from "../data/USER";

export const AuthContext = createContext({
  updateUserData: () => {},
  userData: {},
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContentProvider({ children }) {
  const [userData, setUserData] = useState(USER_DATA[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  function authenticate(userData) {
    setIsAuthenticated(true);
    console.log(userData);
    // setUserData(userData);
    // AsyncStorage.setItem("userData", JSON.stringify(userData));
  }
  function logout() {
    setUserData(null);
    AsyncStorage.removeItem("userData");
    console.log("logout");
  }
  function updateUserData(newData) {
    setUserData((prevData) => {
      return { ...prevData, user: newData };
    });
  }
  const value = {
    userData: userData,
    isAuthenticated: isAuthenticated,
    authenticate: authenticate,
    logout: logout,
    updateUserData: updateUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContentProvider;
