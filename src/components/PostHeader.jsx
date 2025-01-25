import React from "react";

const PostHeader = ({ post }) => {
  return (
    <div className="fixed w-[50%] z-50 top-0 px-5 py-2">
      <div className="flex items-center">
        <img
          src={`http://127.0.0.1:8000/storage/${post.user.avatar}`}
          alt=""
          className="w-[40px] h-[40px] rounded-full"
        />
        <div className="">
          <div className="ml-3.5 flex">
            <h3 className="text-1 text-sm font-semibold">Kyyvrx</h3>
          </div>
        </div>
      </div>
      <hr className="mt-2 border-t border-btn" />
    </div>
  );
};

export default PostHeader;
