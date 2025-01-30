import { useEffect, useState } from "react";
import NavigationBar from "../components/navigatioBar";
import BaseLayout from "../components/Layout/baseLayout";
import { ax } from "../api/authentication";
import { usePostContext } from "../context/PostProvide";
import PostList from "../components/PostList";
import Suggested from "../components/Suggested";
import { useLoadingContext } from "../context/LoadingContext";

export default function HomePage() {
  const { loading, setLoading } = useLoadingContext();
  const [suggested, setSuggested] = useState(false);
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
  const user = JSON.parse(localStorage.getItem("user"));

  const getPosts = async (page = 0) => {
    try {
      setLoading((prev) => ({ ...prev, post: true }));
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
      setLoading((prev) => ({ ...prev, post: false }));
    }
  };

  const handleFollow = async (username) => {
    try {
      setLoading((prev) => ({ ...prev, follow: username }));
      const res = await ax.post(
        `api/v1/users/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuggested((prev) => prev.filter((user) => user.username != username));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prev) => ({ ...prev, follow: "" }));
    }
  };

  useEffect(() => {
    getSuggested();
  }, []);
  useEffect(() => {
    console.log(posts);
  }, [posts]);

  useEffect(() => {
    if (!loading.post && !isPostsFetched) {
      getPosts(page);
      setIsPostsFetched(true);
    }
  }, [page]);

  const handleNext = () => {
    if (
      document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.scrollHeight &&
      !loading.post &&
      isHasMorePost
    ) {
      setIsPostsFetched(false);
      setPage((prev) => (prev += 1));
    }
  };

  const getSuggested = async () => {
    try {
      const res = await ax.get(`api/v1/users/${user.username}/suggested`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuggested(res.data.users);
    } catch (err) {
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
        <main className="w-full lg:flex sm:ml-[76px] lg:ml-[240px] flex-1">
          <PostList posts={posts} setPosts={setPosts} loading={loading} />
          <div className="lg:flex-[1] hidden lg:block mt-10">
            {suggested && (
              <Suggested
                suggested={suggested}
                handleFollow={handleFollow}
                loading={loading.follow}
              />
            )}
          </div>
        </main>
      </BaseLayout>
    </>
  );
}
