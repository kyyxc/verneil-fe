import React, { createContext, useState, useContext } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isHasMorePost, setIsHasMorePost] = useState(true);
  const [page, setPage] = useState(0); 
  const [isPostsFetched, setIsPostsFetched] = useState(false);

  return (
    <PostContext.Provider value={{ posts, setPosts, isHasMorePost, setIsHasMorePost, page, setPage, isPostsFetched, setIsPostsFetched }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
