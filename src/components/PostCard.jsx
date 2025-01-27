import React, { useState } from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post, handleLike }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlider = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevSlider = () => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="w-[468px] flex flex-col justify-center mt-6">
      <div className="flex items-center">
        <img
          src={`http://127.0.0.1:8000/storage/${post.user.avatar}`}
          alt="Post Picture Profile"
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="">
          <div className="ml-3 flex">
            <h3 className="text-1 text-sm font-semibold">
              <Link to={`/${post.user.username}`}>{post.user.username}</Link>
            </h3>
            <p className="ml-2.5 text-1 text-sm">● {post.created_at_ago}</p>
          </div>
          <h5 className="ml-3 text-xs text-1">{post.user.full_name}</h5>
        </div>
      </div>

      <div className="flex relative justify-center items-center">
        {currentIndex != 0 && (
          <i
            className="bi bi-caret-left-fill absolute top-1/2 left-2 text-3xl translate-y-1/2"
            onClick={handlePrevSlider}
          ></i>
        )}
        <img
          src={post.media[currentIndex].url_path}
          alt={`Slide `}
          className="mt-4 rounded-sm w-[468px] h-[585px] object-cover"
        />
        {currentIndex + 1 < post.media.length && (
          <i
            className="bi bi-caret-right-fill absolute top-1/2 text-3xl right-2 translate-y-1/2"
            onClick={handleNextSlider}
          ></i>
        )}
      </div>

      <div className="flex justify-between mt-2.5 px-2">
        <div className="flex items-center gap-6">
          <i
            className={`bi bi-heart-fill text-[26px] ${
              post.is_liked ? "text-red-700" : ""
            }`}
            onClick={() => handleLike(post.id)}
          ></i>
          <Link to={`/show/${post.id}`}>
            <i className="bi bi-chat text-[26px]"></i>
          </Link>
        </div>

        <i className="bi bi-bookmark text-[26px]"></i>
      </div>
      <p className="px-2 mt-2.5 text-sm text-1">{post.likes_count} Likes</p>
      <p className="mx-2 mt-2.5 text-sm text-1">
        {post.caption}
        <b>...</b>
      </p>
      <hr className="mt-10 border-t border-t-btn" />
    </div>
  );
};

export default PostCard;
