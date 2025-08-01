import { createContext, useContext, useState } from "react";
import React from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState({
    post: false,
    follow: "",
    search: false,
    accept: false,
    getList: false,
    getMessages: false,
    explore: false,
    createPost: false,
    createReel: false,
    reel: false,
    getUser: false,
  });
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);
