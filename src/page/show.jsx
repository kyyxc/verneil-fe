import { Link, useParams } from "react-router-dom";
import HomePage from "./home";
import { useEffect, useState } from "react";
import { ax } from "../api/authentication";
import { usePostContext } from "../context/PostProvide";
import { comment } from "postcss";

export default function ShowPage() {
  const { posts, setPosts } = usePostContext();
  const { id } = useParams();
  const [post, setPost] = useState();
  const [body, setBody] = useState("");

  useEffect(() => {
    getPost();
  }, [id]);

  const getPost = async () => {
    try {
      const res = await ax.get(`api/v1/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPost(res.data.post);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const res = await ax.post(
        `/api/v1/posts/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.status == "like") {
        setPost({ ...post, is_liked: true, likes_count: post.likes_count + 1 });
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
        setPost({
          ...post,
          is_liked: false,
          likes_count: post.likes_count - 1,
        });
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

  const handleComments = async (e) => {
    e.preventDefault();
    const data = {
      body: e.target.body.value,
    };

    try {
      const res = await ax.post(`/api/v1/posts/${id}/comment`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPost((prev) => ({
        ...prev,
        comments: [res.data.comment, ...prev.comments],
      }));
      setBody("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(post);
  }, [post]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
  }, []);

  return (
    <div>
      <HomePage></HomePage>

      <Link to="/">
        <i className="bi bi-x text-1 fixed top-0 right-6 text-[42px] z-50"></i>
      </Link>
      {post && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 shadow-sm shadow-slate-200 -translate-y-1/2 flex w-[80%] h-[90%] bg-black">
          <div className="w-[50%] text-1">
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
          <div className="w-[50%] text-1">
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

            {/* Caption */}
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
                  <h3 className="text-1 text-sm font-semibold">
                    {post.user.username}{" "}
                    <p className="font-normal inline text-slate-300">
                      {post.caption}
                    </p>
                  </h3>
                </div>
              </div>
              {post.comments &&
                post.comments.map((comment) => (
                  <div className="flex gap-5 p-5 items-center" key={comment.id}>
                    <div>
                      <img
                        src={`http://127.0.0.1:8000/storage/${comment.user.avatar}`}
                        alt=""
                        className="w-[40px] h-[40px] rounded-full"
                      />
                    </div>
                    <div className="flex flex-1">
                      <h3 className="text-1 text-sm font-semibold">
                        {comment.user.username}{" "}
                        <p className="font-normal inline text-slate-300">
                          {comment.body}
                        </p>
                      </h3>
                    </div>
                  </div>
                ))}
            </div>

            <div className="fixed bottom-0 w-[50%] px-2 pb-2 bg-black">
              <div className="flex justify-between mb-2 px-2 border-t border-t-btn pt-2">
                <div className="flex items-center gap-6">
                  <i
                    className={`bi bi-heart-fill text-[26px] ${
                      post.is_liked ? "text-red-700" : ""
                    }`}
                    onClick={handleLike}
                  ></i>

                  <Link to="/show">
                    <i className="bi bi-chat hidden text-[26px]"></i>
                  </Link>
                </div>
                <i className="bi bi-bookmark text-[26px]"></i>
              </div>
              <p className="px-2 text-sm text-1">{post.likes_count} Likes</p>

              <form onSubmit={handleComments}>
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
          </div>
        </div>
      )}
    </div>
  );
}
