import React from "react";
import { ax } from "../api/authentication";
import PostCard from "./PostCard";
import { LikePost, SavePost } from "../api/post";
import { usePostContext } from "../context/PostProvide";
import Loading from "./Loading";

const PostList = ({ posts, setPosts, loading }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { setIsDelete } = usePostContext();

  const handleLike = (id) => {
    LikePost(id, setPosts);
  };

  const handleSave = (id) => {
    SavePost(id, setPosts);
  }

  const handleDeletePost = async (id) => {
    try {
      const res = await ax.delete(`api/v1/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts((prev) => prev.filter((post) => post.id !== id));
      setIsDelete(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center lg:flex-[2] mt-20">
      {posts &&
        posts.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            handleLike={handleLike}
            handleSave={handleSave}
            user={user}
            handleDeletePost={handleDeletePost}
          />
        ))}
      {loading.post && <Loading></Loading>}
    </div>
  );
};

export default PostList;
