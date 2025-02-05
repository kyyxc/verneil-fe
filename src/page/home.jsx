import { useEffect, useState } from "react";
import BaseLayout from "../components/Layout/baseLayout";
import { ax } from "../api/authentication";
import { usePostContext } from "../context/PostProvide";
import PostList from "../components/PostList";
import Suggested from "../components/Suggested";
import { useLoadingContext } from "../context/LoadingContext";
import RequestFollow from "../components/RequestFollow";

export default function HomePage() {
  const { loading, setLoading } = useLoadingContext();
  const [suggested, setSuggested] = useState([]);
  const [requestFollow, setRequestFollow] = useState([]);
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

  useEffect(() => {
    getSuggested();
    getRequest();
  }, []);

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

  const handleAccept = async (username) => {
    try {
      setLoading((prev) => ({ ...prev, accept: username }));
      await ax.put(
        `api/v1/users/${username}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRequestFollow((prev) =>
        prev.filter((user) => user.username != username)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prev) => ({ ...prev, accept: "" }));
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

  const getRequest = async () => {
    try {
      const res = await ax.get(`api/v1/users/${user.username}/followers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRequestFollow(
        res.data.followers.filter((user) => user.is_requested).slice(0, 10)
      );
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
          {posts && (
            <PostList posts={posts} setPosts={setPosts} loading={loading} />
          )}
          <div className="lg:flex-[1] hidden lg:block mt-10">
            {requestFollow && requestFollow.length > 0 && (
              <RequestFollow
                requests={requestFollow}
                loading={loading.accept}
                handleAccept={handleAccept}
              ></RequestFollow>
            )}
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
