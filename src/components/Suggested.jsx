import React from "react";
import SuggestedList from "./SuggestedList";
import { usePostContext } from "../context/PostProvide";

const Suggested = ({ suggested, handleFollow, loading }) => {
  const { isOpenLike, isOpenMenu, isDelete, createStatus } = usePostContext();
  return (
    <div
      className={`gap-5 flex flex-col px-10 lg:w-80 ${
        isDelete || isOpenLike || isOpenMenu || createStatus
          ? "opacity-20 pointer-events-none duration-0"
          : ""
      }`}
    >
      <h5 className="text-sm text-1">Suggested for you</h5>
      {suggested.map((user, index) => (
        <SuggestedList key={index} user={user} handleFollow={handleFollow} loading={loading} />
      ))}
    </div>
  );
};

export default Suggested;
