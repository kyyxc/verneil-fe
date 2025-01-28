import React from "react";
import StatusFollowing from "./StatusFollowing";

const UserProfileHeader = ({user, setUser, setIsOpenFollowers, setIsOpenFollowing}) => {
  return (
    <div className="flex px-4 sm:px-0">
      <div className="sm:flex-[1] sm:flex sm:justify-center sm:items-center">
        <img
          src={user.avatar}
          alt="Profile Pic"
          className="rounded-full object-cover sm:w-40 sm:h-40 w-20 h-20"
        />
      </div>
      <div className="ml-5 sm:mt-4 sm:flex-[2] self-center">
        <div className="sm:flex sm:items-center">
          <div className="text-1 text-xl mb-2.5 sm:mb-0">{user.username}</div>
          <StatusFollowing user={user} setUser={setUser}></StatusFollowing>
        </div>
        <div className="hidden sm:flex gap-x-16 mt-3.5">
          <div className="sm:flex">
            <p className="text-sm">
              <b>{user.posts_count}</b> Post
            </p>
          </div>
          <div className="sm:flex" onClick={() => setIsOpenFollowers(true)}>
            <p className="text-sm">
              <b>{user.followers_count}</b> followers
            </p>
          </div>
          <div className="sm:flex" onClick={() => setIsOpenFollowing(true)}>
            <p className="text-sm">
              <b>{user.following_count}</b> following
            </p>
          </div>
        </div>
        <div className="mt-5 hidden sm:flex sm:flex-col">
          <h1 className="text-1 font-semibold">{user.full_name}</h1>
          <p className="text-slate-300 md:w-[80%]">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
