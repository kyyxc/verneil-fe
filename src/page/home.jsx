import { useEffect, useState } from "react";
import NavigationBar from "../components/navigatioBar";
import BaseLayout from "../components/Layout/baseLayout";
import { ax } from "../api/authentication";
import { usePostContext } from "../context/PostProvide";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    posts,
    setPosts,
    isHasMorePost,
    setIsHasMorePost,
    page,
    setPage,
    isPostsFetched,
    setIsPostsFetched,
  } = usePostContext();

  const getPosts = async (page = 0) => {
    try {
      setIsLoading(true);
      const res = await ax.get(`/api/v1/posts?page=${page}&size=3`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.length > 0) {
        setPosts((prev) => [...prev, ...res.data]);
      } else {
        setIsHasMorePost(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !isPostsFetched) {
      getPosts(page);
      setIsPostsFetched(true);
    }
  }, [page]);

  const handleNext = async () => {
    if (
      document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.scrollHeight &&
      !isLoading &&
      isHasMorePost
    ) {
      setIsPostsFetched(false);
      setPage((prev) => (prev += 1));
    }
  };

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
    } catch (err) {I
      console.log(err);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNext);
    return () => window.removeEventListener("scroll", handleNext);
  }, [handleNext]);

  return (
    <>
      <BaseLayout>
        <NavigationBar />
        <main className="w-full lg:flex sm:ml-[76px] lg:ml-[240px] flex-1">
          <div className="flex flex-wrap justify-center lg:flex-[2] mt-20">
            {posts &&
              posts.map((post) => (
                <div
                  className="w-[468px] flex flex-col justify-center mt-6"
                  key={post.id}
                >
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
                      <h5 className="ml-3 text-xs text-1">
                        {post.user.full_name}
                      </h5>
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
                  <p className="px-2 mt-2.5 text-sm text-1">
                    {post.likes_count} Likes
                  </p>
                  <p
                    className="mx-2 mt-2.5 text-sm text-1"
                    onClick={() => setIsMore(!isMore)}
                  >
                    {post.caption}
                    <b>...</b>
                  </p>
                  <hr className="mt-10 border-t border-t-btn" />
                </div>
              ))}
          </div>

          <div className="lg:flex-[1] hidden lg:block mt-10">
            <div className="gap-5 flex flex-col">
              <div className="flex items-center">
                <img
                  src="/images/faixfey.jpg"
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="">
                  <div className="ml-3 flex">
                    <h3 className="text-1 text-sm font-semibold">Kyyvrx</h3>
                  </div>
                  <h5 className="ml-3 text-xs text-1">Suggested</h5>
                </div>
              </div>
            </div>
          </div>
        </main>
      </BaseLayout>
    </>
  );
}
