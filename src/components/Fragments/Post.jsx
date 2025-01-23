import { useState } from "react";
import { Link } from "react-router-dom";
import { usePostContext } from "../../context/PostProvide";
import { ax } from "../../api/authentication";

export default function Post({ post }) {
  const { setPosts } = usePostContext();

  const handleLike = async (id) => {
    try {
      const res = await ax.post(
        `/api/v1/posts/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.status == "like") {
        setPosts((prev) =>
          prev.map((post) =>
            post.id == id
              ? {
                  ...post,
                  likes_count: (post.likes_count += 1),
                  is_liked: true,
                }
              : post
          )
        );
      } else {
        setPosts((prev) =>
          prev.map((post) =>
            post.id == id
              ? {
                  ...post,
                  likes_count: (post.likes_count -= 1),
                  is_liked: false,
                }
              : post
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-[468px] flex flex-col justify-center mt-6">
        <div className="flex items-center">
          <img
            src={`http://127.0.0.1:8000/storage/${post.user.avatar}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="">
            <div className="ml-3 flex">
              <h3 className="text-1 text-sm font-semibold">
                {post.user.username}
              </h3>
              <p className="ml-2.5 text-1 text-sm">● 1 hour</p>
            </div>
            <h5 className="ml-3 text-xs text-1">{post.user.full_name}</h5>
          </div>
        </div>
        {post.media &&
          post.media.map((url) => (
            <img
              key={url.id}
              src={url.url_path}
              alt=""
              className="mt-4 rounded-sm w-[468px] h-[585px] object-cover"
            />
          ))}
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
        <p
          className="mx-2 mt-2.5 text-sm text-1"
          onClick={() => setIsMore(!isMore)}
        >
          {post.caption}
          <b>...</b>
        </p>
        <hr className="mt-10 border-t border-t-btn" />
      </div>
    </>
  );
}
