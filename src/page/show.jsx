import { Link, useParams } from "react-router-dom";
import HomePage from "./home";
import { useEffect, useState } from "react";
import { ax } from "../api/authentication";
import { usePostContext } from "../context/PostProvide";

export default function ShowPage() {
  const { isPostsFetched, setIsPostsFetched } = usePostContext();
  const { id } = useParams();
  const [post, setPost] = useState();

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
      console.log(res.data.post);
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
      } else {
        setPost({
          ...post,
          is_liked: false,
          likes_count: post.likes_count - 1,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
  }, []);

  let text =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Excepturi quasi quibusdam commodi vitae voluptatibus, asperioreseos laborum quo modi, optio reiciendis corporis sint distinctio  placeat recusandae? Eaque accusantium nulla dolorem?";
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
                  src={media.url_path}
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
                  src={post.user.avatar}
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
            <div className="mt-20 overflow-y-scroll max-h-[70%] scrollbar-hidden">
              <div className="flex gap-5 p-5 ">
                <div>
                  <img
                    src={post.user.avatar}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div className="flex flex-1">
                  <h3 className="text-1 text-sm font-semibold">
                    {post.user.username}{" "}
                    <p className="font-normal inline text-slate-300">{text}</p>
                  </h3>
                </div>
              </div>
              {post.comments.map((comment) => (
                <div className="flex gap-5 p-5 ">
                  <div>
                    <img
                      src={comment.avatar}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  </div>
                  <div className="flex flex-1">
                    <h3 className="text-1 text-sm font-semibold">
                      {comment.username}{" "}
                      <p className="font-normal inline text-slate-300">
                        {post.caption}
                      </p>
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="fixed bottom-0 w-[50%] px-2 pb-2 bg-black">
              <div className="flex justify-between mb-4 px-2 border-t border-t-btn pt-2">
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
                <p className="px-2 mt-2.5 text-sm text-1">
                  {post.likes_count} Likes
                </p>
                <i className="bi bi-bookmark text-[26px]"></i>
              </div>

              <form action="" className="">
                <div className="flex justify-around mt-2 border-t border-t-btn pt-2">
                  <input
                    type="text"
                    className="w-[80%] bg-transparent outline-none"
                    placeholder="Comment Here"
                  />
                  <p className="text-blue-600">Send</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
