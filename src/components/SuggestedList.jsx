import React from "react";

const SuggestedList = ({ user }) => {
  return (
    <div className="flex items-center w-full">
      <img
        src={`http://localhost:8000/storage/${user.avatar}`}
        alt=""
        className="w-[50px] h-[50px] rounded-full"
      />
      <div className="ml-3 flex items-center justify-between w-full">
        <h3 className="text-1 text-sm truncate">{user.username}</h3>
        <p className="text-sm text-blue-700">follow</p>
      </div>
    </div>
  );
};

export default SuggestedList;
