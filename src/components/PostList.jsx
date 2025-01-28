import React from "react";
import { ax } from "../api/authentication";
import PostCard from "./PostCard";
import { LikePost } from "../api/post";

const PostList = ({ posts, setPosts}) => {
  const handleLike = (id) => {
    LikePost(id, setPosts);
  };

  return (
    <div className="flex flex-wrap justify-center lg:flex-[2] mt-20">
      {posts &&
        posts.map((post) => (
          <PostCard key={post.id} post={post} handleLike={handleLike} />
        ))}
    </div>
  );
};

export default PostList;
