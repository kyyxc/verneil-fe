import React from "react";
import PostHeader from "./PostHeader";
import PostComment from "./PostComment";

const PostDetail = ({ post, handleLike }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 shadow-sm shadow-slate-200 -translate-y-1/2 flex flex-col sm:flex-row w-[80%] h-[90%] bg-black">
      
      <div className="flex-1 text-1">
        <div className="h-full">
          {post.media.map((media) => (
            <img
              key={media.id}
              src={`http://127.0.0.1:8000/storage/${media.url_path}`}
              alt=""
              className="rounded-sm w-full h-full 1 object-cover"
            />
          ))}
        </div>
      </div>

      <div className="flex-1 text-1 hidden sm:flex">
        <PostHeader post={post} />

        <PostComment post={post} handleLike={handleLike}></PostComment>
      </div>
    </div>
  );
};

export default PostDetail;
