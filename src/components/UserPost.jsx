import { Lock } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const UserPost = ({ user }) => {
  if (user.is_privated && user.following_status !== "following" && !user.is_your_account) {
    return (
      <div className="flex justify-center items-center flex-1">
        <div className="flex items-center">
          <Lock size={50} />
          <div className="flex flex-col ml-3.5">
            <h1 className="text-1 text-sm font-semibold">
              This account is private
            </h1>
            <p className="text-slate-300 text-sm">
              Follow to see their photos and videos.
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-3 gap-1 mb-20">
        {user.posts &&
          user.posts.map((post, index) => (
            <div className="h-52 sm:h-72 lg:h-96 xl:h-[600px]" key={index}>
              <Link to={`/show/${post.id}`}>
                <img
                  src={post.media[0].url_path}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </Link>
            </div>
          ))}
      </div>
    );
  }
};

export default UserPost;
