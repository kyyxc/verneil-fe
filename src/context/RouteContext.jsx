import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { useLocation } from "react-router-dom";

const RouteContext = createContext();


export const RouteProvider = ({children}) => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(null);

  useEffect(() => {
    setPrevLocation(location);
  }, [location]);

  return (
    <RouteContext.Provider value={{ prevLocation, currentLocation: location }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRouteContext = () => useContext(RouteContext);
