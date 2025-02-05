import React, { useState } from "react";
import PostHeader from "./PostHeader";
import PostComment from "./PostComment";
import { ax } from "../api/authentication";
import { Link } from "react-router-dom";

const PostDetail = ({
  post,
  handleLike,
  isOpenMenu,
  setIsOpenMenu,
  handleDeletePost,
  deleteCommentId,
  setDeleteCommentId,
  setPost,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleNextSlider = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevSlider = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleDeleteComment = async (id) => {
    setDeleteCommentId({});
    try {
      await ax.delete(`api/v1/posts/${id}/comment/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPost((prev) => ({
        ...prev,
        comments: prev.comments.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className={`${
          isOpenMenu ? "pointer-events-none opacity-70" : ""
        } fixed top-1/2 left-1/2 transform -translate-x-1/2 shadow-sm shadow-slate-200 -translate-y-1/2 flex flex-col sm:flex-row w-96 h-9w-96  sm:w-[80%] sm:h-[90%] bg-black`}
      >
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
          <PostHeader post={post} setIsOpenMenu={setIsOpenMenu} />

          <PostComment
            post={post}
            handleLike={handleLike}
            setDeleteCommentId={setDeleteCommentId}
            user={user}
          ></PostComment>
        </div>
      </div>

      {isOpenMenu == post.id && (
        <div className="fixed flex flex-col z-50 text-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-96 bg-btn text-sm">
          {user.id == post.user.id && (
            <>
              <div
                className="w--full text-center py-3 border-b border-b-gray-500 text-red-500"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </div>
              {/* <div
                className="w--full text-center py-3 border-b border-b-gray-500 text-blue-500"
                onClick={() => handleDeletePost(post.id)}
              >
                Update
              </div> */}
            </>
          )}
          <Link
            to={`/${post.user.username}`}
            onClick={() => setIsOpenMenu(false)}
          >
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

      {deleteCommentId.user_id == user.id && (
        <div className="fixed text-1 flex flex-col z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-96 bg-btn text-sm">
          <div
            className="w--full text-center py-3 border-b border-b-gray-500 text-red-500"
            onClick={() => handleDeleteComment(deleteCommentId.id)}
          >
            Delete
          </div>

          <div
            className="w--full text-center py-3"
            onClick={() => setDeleteCommentId({})}
          >
            Cancel
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
