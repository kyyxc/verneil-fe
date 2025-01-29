import React from "react";
import { Link } from "react-router-dom";

const PostHeader = ({ post, setIsOpenMenu }) => {
  return (
    <div className="fixed w-[50%] z-50 top-0 px-5 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={`http://127.0.0.1:8000/storage/${post.user.avatar}`}
            alt=""
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className="">
            <div className="ml-3.5 flex">
              <Link
                to={`/${post.user.username}`}
                className="text-1 text-sm font-semibold"
              >
                {post.user.username}
              </Link>
            </div>
          </div>
        </div>
        <i
          className="bi bi-three-dots"
          onClick={() => setIsOpenMenu(post.id)}
        ></i>
      </div>
      <hr className="mt-2 border-t border-btn" />
    </div>
  );
};

export default PostHeader;
