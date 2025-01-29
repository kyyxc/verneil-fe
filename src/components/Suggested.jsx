import React from "react";
import SuggestedList from "./SuggestedList";
import { usePostContext } from "../context/PostProvide";

const Suggested = ({ suggested, handleFollow }) => {
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
      {suggested.map((user) => (
        <SuggestedList key={user.id} user={user} handleFollow={handleFollow} />
      ))}
    </div>
  );
};

export default Suggested;
