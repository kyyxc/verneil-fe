import React, { useEffect } from "react";
import BaseLayout from "../components/Layout/baseLayout";
import { useSavedContext } from "../context/SavedContext";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { ax, } from "../api/authentication";

const SavedPage = () => {
  const { saved, setSaved, isLoading, setIsLoading } = useSavedContext();


  useEffect(() => {
    getSavedPosts();
  }, []);

  const getSavedPosts = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await ax.get(`api/v1/posts/saved`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.posts);
      setSaved(res.data.posts);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  //   const handleNext = () => {
  //     if (
  //       document.documentElement.scrollTop + window.innerHeight >=
  //         document.documentElement.scrollHeight - 100 &&
  //       !isLoading &&
  //       isHasMore
  //     ) {
  //       setIsPostsFetched(false);
  //       setPage((prev) => (prev += 1));
  //     }
  //   };

  //   useEffect(() => {
  //     window.addEventListener("scroll", handleNext);
  //     return () => window.removeEventListener("scroll", handleNext);
  //   }, [handleNext]);
  return (
    <BaseLayout>
      <div className="flex-1 lg:flex sm:ml-[76px] lg:ml-[240px] sm:flex sm:flex-col">
        <div className="p-4 w-full">
          <div className="grid grid-cols-3 gap-1 mb-2">
            {saved &&
              saved.map((post, index) => (
                <Link to={`/show/${post.id}`} key={index}>
                  <div className="h-52 sm:h-72 lg:h-96 xl:h-[400px] 2xl:h-[600px]">
                    <img
                      src={post.media[0].url_path}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
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
};

export default SavedPage;
