import React, { createContext, useState, useContext } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isHasMorePost, setIsHasMorePost] = useState(true);
  const [page, setPage] = useState(0);
  const [isPostsFetched, setIsPostsFetched] = useState(false);
  const [tabStatus, setTabStatus] = useState(true);
  const [isSearching, setIsSearching] = useState(true);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        isHasMorePost,
        setIsHasMorePost,
        page,
        setPage,
        isPostsFetched,
        setIsPostsFetched,
        tabStatus,
        setTabStatus,
        isSearching,
        setIsSearching
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
