import React, { createContext, useContext, useState } from "react";

const SavedContext = createContext();

export const SavedProvide = ({children}) => {
  const [saved, setSaved] = useState([]);
  const [page, setPage] = useState(0);
  const [isPostsFetched, setIsPostsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHasMore, setIsHasMore] = useState(true);

  return (
    <SavedContext.Provider
      value={{
        saved,
        setSaved,
        page,
        setPage,
        isPostsFetched,
        setIsPostsFetched,
        isLoading,
        setIsLoading,
        isHasMore,
        setIsHasMore,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};

export const useSavedContext = () => useContext(SavedContext);
