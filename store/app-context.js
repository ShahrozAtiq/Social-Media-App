import { createContext, useEffect, useRef, useState } from "react";

export const AppContext = createContext({
  tabBarHeight: 0,
  setTabBarHeight: () => {},
  fetchingUsers: true,
  setFetchingUsers: () => {},
});

function AppContextProvider({ children }) {
  const [tabBarHeight, setTabBarHeight] = useState();
  const [fetchingUsers, setFetchingUsers] = useState(true);

  const value = {
    setTabBarHeight: setTabBarHeight,
    tabBarHeight: tabBarHeight,
    fetchingUsers: fetchingUsers,
    setFetchingUsers: setFetchingUsers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
