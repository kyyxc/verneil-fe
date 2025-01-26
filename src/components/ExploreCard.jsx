import React from "react";
import { Link } from "react-router-dom";

const ExploreCard = ({ post }) => {
  return (
    <Link to={`/show/${post.id}`}>
      <div className="h-50">
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
