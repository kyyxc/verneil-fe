import React from "react";
import SuggestedList from "./SuggestedList";

const Suggested = ({ suggested }) => {
  return (
    <div className="gap-5 flex flex-col px-10 lg:w-80">
      <h5 className="text-sm text-1">Suggested for you</h5>
      {suggested.map((user) => (
        <SuggestedList key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Suggested;
