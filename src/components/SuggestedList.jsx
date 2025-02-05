import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const SuggestedList = ({ user, handleFollow, loading }) => {
  return (
    <div className="flex items-center w-full">
      <img
        src={`http://localhost:8000/storage/${user.avatar}`}
        alt=""
        className="w-[50px] h-[50px] rounded-full"
      />
      <div className="ml-3 flex items-center justify-between w-full">
        <Link to={`${user.username}`} className="text-1 text-sm truncate">
          {user.username}
        </Link>
        <p
          className="text-sm text-blue-700"
          onClick={() => handleFollow(user.username)}
        >
          {!loading && <>Follow</>}
        </p>
        {loading == user.username && <Loading />}
      </div>
    </div>
  );
};

export default SuggestedList;
