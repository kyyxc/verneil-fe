import React from "react";
import { ax } from "../api/authentication";
import PostCard from "./PostCard";
import { LikePost } from "../api/post";

const PostList = ({ posts, setPosts }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLike = (id) => {
    LikePost(id, setPosts);
  };

  const handleDeletePost = async (id) => {
    try {
      const res = await ax.delete(`api/v1/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-wrap justify-center lg:flex-[2] mt-20">
      {posts &&
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            handleLike={handleLike}
            user={user}
            handleDeletePost={handleDeletePost}
          />
        ))}
    </div>
  );
};

export default PostList;
