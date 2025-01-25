import React from "react";

const UserPost = ({ posts }) => {
  return (
    <div className="grid grid-cols-3 gap-1 mb-20">
      {posts &&
        posts.map((post) => (
          <div className="h-50" key={post.id}>
            {post.media.map((url) => (
              <img
                key={url.id}
                src={url.url_path}
                alt=""
                className="h-full w-full object-cover"
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default UserPost;
