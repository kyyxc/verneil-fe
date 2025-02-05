import React from "react";
import { Link } from "react-router-dom";

const ExploreCard = ({ post }) => {
  return (
    <Link to={`/show/${post.id}`}>
      <div className="h-52 sm:h-72 lg:h-96 xl:h-[500px]">
        <img
          src={post.media[0].url_path}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </Link>
  );
};

export default ExploreCard;
