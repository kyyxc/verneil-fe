import React from "react";
import { Link } from "react-router-dom";

const UserPost = ({ posts }) => {
  return (
    <div className="grid grid-cols-3 gap-1 mb-20">
      {posts &&
        posts.map((post) => (
          <div className="h-50" key={post.id}>
            <Link to={`/show/${post.id}`}>
              <img
                src={post.media[0].url_path}
                alt=""
                className="h-full w-full object-cover"
              />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default UserPost;
