import { createContext, useContext, useState } from "react";

const ExploreContext = createContext();

import React from "react";

export const ExploreProvider = ({ children }) => {
  const [explore, setExplore] = useState([]);
  const [page, setPage] = useState(0);
  const [isPostsFetched, setIsPostsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHasMore, setIsHasMore] = useState(true);
  return (
    <ExploreContext.Provider
      value={
        {explore, setExplore, page, setPage, isPostsFetched, setIsPostsFetched, isLoading, setIsLoading, isHasMore, setIsHasMore}
      }
    >
      {children}
    </ExploreContext.Provider>
  );
};

export const useExploreContext = () => useContext(ExploreContext);
