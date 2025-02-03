import React, { createContext, useState, useContext } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isHasMorePost, setIsHasMorePost] = useState(true);
  const [page, setPage] = useState(0);
  const [isPostsFetched, setIsPostsFetched] = useState(false);
  const [tabStatus, setTabStatus] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [isOpenLike, setIsOpenLike] = useState(0);
  const [isOpenMenu, setIsOpenMenu] = useState(0);
  const [isDelete, setIsDelete] = useState(0);
  const [deleteCommentId, setDeleteCommentId] = useState({});
  const [user, setUser] = useState({})

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
        setIsSearching,
        createStatus,
        setCreateStatus,
        isOpenLike,
        setIsOpenLike,
        isOpenMenu,
        setIsOpenMenu,
        isDelete,
        setIsDelete,
        deleteCommentId,
        setDeleteCommentId,
        user, setUser
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
