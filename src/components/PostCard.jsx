import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePostContext } from "../context/PostProvide";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

const PostCard = ({ post, handleLike, user, handleDeletePost }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    isOpenLike,
    setIsOpenLike,
    isOpenMenu,
    setIsOpenMenu,
    isDelete,
    setIsDelete,
    createStatus,
  } = usePostContext();
  const handleNextSlider = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevSlider = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleSelectedDelete = (id) => {
    setIsOpenMenu(false);
    setIsDelete(id);
  };

  return (
    <>
      <div
        className={`${
          isDelete || isOpenLike || isOpenMenu || createStatus
            ? "opacity-20 pointer-events-none"
            : ""
        } w-[468px] flex flex-col justify-center mt-6`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={`http://127.0.0.1:8000/storage/${post.user.avatar}`}
              alt="Post Picture Profile"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div className="flex flex-col">
              <div className="ml-3 flex items-center">
                <h3 className="text-1 text-sm font-semibold">
                  <Link to={`/${post.user.username}`}>
                    {post.user.username}
                  </Link>
                </h3>
                <p className="ml-2.5 text-1 text-xs">● {post.created_at_ago}</p>
              </div>
              <h5 className="ml-3 text-xs text-1">{post.user.full_name}</h5>
            </div>
          </div>
          <i
            className="bi bi-three-dots"
            onClick={() => setIsOpenMenu(post.id)}
          ></i>
        </div>
        <div className="flex relative justify-center items-center">
          {currentIndex != 0 && (
            <CircleChevronLeft
              size={30}
              className="absolute top-1/2 left-2 translate-y-1/2"
              onClick={handlePrevSlider}
            />
          )}
          <img
            src={post.media[currentIndex].url_path}
            alt={`Slide `}
            className="mt-4 rounded-sm w-[468px] h-[585px] object-cover"
          />
          {currentIndex + 1 < post.media.length && (
            <CircleChevronRight
              size={30}
              className="absolute top-1/2 right-2 translate-y-1/2"
              onClick={handleNextSlider}
            />
          )}
        </div>
        <div className="flex justify-between mt-2.5 px-2">
          <div className="flex items-center gap-6">
            <i
              className={`bi bi-heart-fill text-[26px] ${
                post.is_liked ? "bi-heart-fill text-red-700" : "bi-heart"
              }`}
              onClick={() => handleLike(post.id)}
            ></i>
            <Link to={`/show/${post.id}`}>
              <i className="bi bi-chat text-[26px]"></i>
            </Link>
          </div>

          <i className="bi bi-bookmark text-[26px]"></i>
        </div>
        <p
          className="px-2 mt-2.5 text-sm text-1"
          onClick={() => setIsOpenLike(post.id)}
        >
          {post.likes_count} Likes
        </p>
        <p className="mx-2 mt-2.5 text-sm text-1">
          {post.caption}
          <b>...</b>
        </p>
        <hr className="mt-10 border-t border-t-btn" />
      </div>

      {isOpenLike == post.id && (
        <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-96 h-96 bg-btn">
          <div className="h-full flex flex-col">
            <div className="flex relative justify-center py-1.5  border-b border-b-slate-400">
              <h1>Like</h1>
              <i
                className="bi bi-x fixed right-2 text-1 top-0 text-[24px]"
                onClick={() => setIsOpenLike(false)}
              ></i>
            </div>
            <div className="p-4 overflow-y-scroll h-full">
              {post.likes &&
                post.likes.length > 0 &&
                post.likes.map((like) => (
                  <div className="flex items-center my-4" key={like.id}>
                    <img
                      src={`http://127.0.0.1:8000/storage/${like.user.avatar}`}
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                    <div className="">
                      <div className="ml-3 flex">
                        <Link to="/" className="text-1 text-sm font-semibold">
                          {like.user.username}
                        </Link>
                      </div>
                      <h5 className="ml-3 text-xs text-1">
                        {like.user.username}
                      </h5>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {isOpenMenu == post.id && (
        <div className="fixed flex flex-col z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-96 bg-btn text-sm">
          {user.id == post.user.id && (
            <div
              className="w--full text-center py-3 border-b border-b-gray-500 text-red-500"
              onClick={() => handleSelectedDelete(post.id)}
            >
              Delete
            </div>
          )}
          <Link to={`/${post.user.username}`} onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <div className="w--full text-center py-3 border-b border-b-gray-500">
              View Profile
            </div>
          </Link>
          <div
            className="w--full text-center py-3"
            onClick={() => setIsOpenMenu(0)}
          >
            Cancel
          </div>
        </div>
      )}

      {isDelete == post.id && (
        <div className="fixed flex flex-col z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-96 bg-btn text-sm">
          <div
            className="w--full text-center py-3 border-b border-b-gray-500 text-red-500"
            onClick={() => handleDeletePost(post.id)}
          >
            Delete
          </div>

          <div
            className="w--full text-center py-3"
            onClick={() => setIsDelete(0)}
          >
            Cancel
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
