import React, { useState } from "react";
import { ax } from "../api/authentication";
import { Link } from "react-router-dom";

const PostComment = ({ post, handleLike, setDeleteCommentId, user }) => {
  const [body, setBody] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();
    const data = {
      body: e.target.body.value,
    };

    try {
      const res = await ax.post(`/api/v1/posts/${post.id}/comment`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      post.comments.unshift(res.data.comment);
      setBody("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="mt-20 overflow-y-scroll max-h-[80%] scrollbar-hidden">
        <div className="flex gap-5 p-5 items-center">
          <div>
            <img
              src={`http://127.0.0.1:8000/storage/${post.user.avatar}`}
              alt=""
              className="w-[40px] h-[40px] rounded-full"
            />
          </div>
          <div className="flex flex-1">
            <div className="text-1 text-sm font-semibold">
              <Link to={`/${post.user.username}`}>{post.user.username}</Link>

              <p className="font-normal ml-2 inline text-slate-300">
                {post.caption}
              </p>
            </div>
          </div>
        </div>
        {post.comments &&
          post.comments.map((comment) => (
            <div className="flex items-center justify-between">
              <div className="flex gap-5 p-5 items-center" key={comment.id}>
                <div>
                  <img
                    src={`http://127.0.0.1:8000/storage/${comment.user.avatar}`}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div className="flex flex-1">
                  <div className="text-1 text-sm font-semibold">
                    <Link to={`/${comment.user.username}`}>
                      {comment.user.username}
                    </Link>
                    <p className="font-normal ml-2 inline text-slate-300">
                      {comment.body}
                    </p>
                  </div>
                </div>
              </div>
              {comment.user_id == user.id && (
                <i
                className="bi bi-three-dots mr-5"
                onClick={() =>
                  setDeleteCommentId({ id: comment.id, user_id: comment.user.id })
                }
              ></i>
              )}
            </div>
          ))}
      </div>

      <div className="fixed bottom-0 w-[50%] px-2 pb-2 bg-black">
        <div className="flex justify-between mb-2 px-2 border-t border-t-btn pt-2">
          <i
            className={`bi text-[26px] ${
              post.is_liked ? "bi-heart-fill text-red-700" : "bi-heart"
            }`}
            onClick={() => handleLike(post.id)}
          ></i>

          <i className="bi bi-bookmark text-[26px]"></i>
        </div>
        <p className="px-2 text-sm text-1">{post.likes_count} Likes</p>
        <p className="px-2 text-sm text-slate-400">{post.created_at_ago}</p>

        <form onSubmit={handleComment}>
          <div className="flex justify-around mt-2 border-t border-t-btn pt-2">
            <input
              type="text"
              className="w-[80%] bg-transparent outline-none"
              placeholder="Comment Here"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <button>
              <p className="text-blue-600">Send</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostComment;
