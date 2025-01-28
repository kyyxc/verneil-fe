import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

import React from "react";

export const ProfileProvider = ({ children }) => {
  const [isOpenFollowers, setIsOpenFollowers] = useState(false);
  const [isOpenFollowing, setIsOpenFollowing] = useState(false);
  return (
    <ProfileContext.Provider
      value={{
        isOpenFollowers,
        setIsOpenFollowers,
        isOpenFollowing,
        setIsOpenFollowing,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const userProfileProvider = () => useContext(ProfileContext);
