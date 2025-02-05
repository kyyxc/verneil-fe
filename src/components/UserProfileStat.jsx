import React from "react";

const UserProfileStat = ({ user, setIsOpenFollowers, setIsOpenFollowing }) => {
  return (
    <div className="mt-8 sm:hidden px-4 sm:px-0 ">
      <h1 className="text-1 font-semibold">{user.full_name}</h1>
      <p className="text-slate-300">{user.bio}</p>

      <div className="border-t border-t-btn py-1.5 flex justify-evenly items-center mt-5 sm:hidden">
        <div className="text-center">
          <p className="font-semibold text-sm">Post</p>
          <p className="text-xs text-slate-300">{user.posts_count}</p>
        </div>
        <div
          className="text-center cursor-pointer"
          onClick={() => setIsOpenFollowers(true)}
        >
          <p className="font-semibold text-sm">Followers</p>
          <p className="text-xs text-slate-300">{user.followers_count}</p>
        </div>
        <div
          className="text-center cursor-pointer"
          onClick={() => setIsOpenFollowing(true)}
        >
          <p className="font-semibold text-sm">Following</p>
          <p className="text-xs text-slate-300">{user.following_count}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileStat;
