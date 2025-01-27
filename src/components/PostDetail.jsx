import React, { useState } from "react";
import PostHeader from "./PostHeader";
import PostComment from "./PostComment";

const PostDetail = ({ post, handleLike }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(post);

  const handleNextSlider = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevSlider = () => {
    setCurrentIndex(currentIndex - 1);
  };
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 shadow-sm shadow-slate-200 -translate-y-1/2 flex flex-col sm:flex-row w-[80%] h-[90%] bg-black">
      <div className="flex-1 text-1 bg-slate-50">
        <div className="h-full bg-slate-200 ">
          <div className="flex relative justify-center items-center h-full">
            {currentIndex != 0 && (
              <i
                className="bi bi-caret-left-fill absolute top-1/2 left-2 text-3xl translate-y-1/2"
                onClick={handlePrevSlider}
              ></i>
            )}
            <img
              src={`http://127.0.0.1:8000/storage/${post.media[currentIndex].url_path}`}
              alt=""
              className="rounded-sm w-full h-full 1 object-cover"
            />
            {currentIndex + 1 < post.media.length && (
              <i
                className="bi bi-caret-right-fill absolute top-1/2 text-3xl right-2 translate-y-1/2"
                onClick={handleNextSlider}
              ></i>
            )}
          </div>
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
