import { useEffect, useState } from "react";
import NavigationBar from "../components/navigatioBar";
import BaseLayout from "../components/Layout/baseLayout";
import { ax } from "../api/authentication";
import Post from "../components/Fragments/Post";
import { usePostContext } from "../context/PostProvide";

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
    setLikedPost,
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
        setLikedPost((prev) => [
          ...prev,
          ...res.data.filter((post) => post.is_liked).map((post) => post.id),
        ]);
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

  useEffect(() => {
    document.body.classList.remove("overflow-hidden");
  }, []);

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
                <Post key={post.id} post={post}/>
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
