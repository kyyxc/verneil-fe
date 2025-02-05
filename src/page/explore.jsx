import { useEffect } from "react";
import ExploreCard from "../components/ExploreCard";
import BaseLayout from "../components/Layout/baseLayout";
import { ax } from "../api/authentication";
import { useExploreContext } from "../context/ExploreContext";
import { useLoadingContext } from "../context/LoadingContext";
import Loading from "../components/Loading";

export default function ExplorePage() {
  const {
    explore,
    setExplore,
    page,
    setPage,
    isPostsFetched,
    setIsPostsFetched,
    isLoading,
    setIsLoading,
    isHasMore,
    setIsHasMore,
  } = useExploreContext();

  useEffect(() => {
    if (!isPostsFetched && !isLoading) {
      getExplore();
      setIsPostsFetched(true);
    }
  }, [page]);

  const getExplore = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await ax.get(`/api/v1/posts/explore?size=15&page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.length > 0) setExplore((prev) => [...prev, ...res.data]);
      else setIsHasMore(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (
      document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.scrollHeight - 100 &&
      !isLoading &&
      isHasMore
    ) {
      setIsPostsFetched(false);
      setPage((prev) => (prev += 1));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNext);
    return () => window.removeEventListener("scroll", handleNext);
  }, [handleNext]);

  return (
    <BaseLayout>
      <div className="flex-1 lg:flex sm:ml-[76px] lg:ml-[240px] sm:flex sm:flex-col">
        <div className="p-4 w-full">
          <div className="grid grid-cols-3 gap-1 mb-2">
            {explore &&
              explore.map((post, index) => (
                <ExploreCard key={index} post={post}></ExploreCard>
              ))}
          </div>
          {isLoading && (
            <div className="flex justify-center items-center w-full my-10">
              <Loading></Loading>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}
