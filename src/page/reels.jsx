import React, { useEffect, useState } from "react";
import BaseLayout from "../components/Layout/baseLayout";
import { ax } from "../api/authentication";
import Loading from "../components/Loading";
import { useLoadingContext } from "../context/LoadingContext";

const ReelsPage = () => {
  const [reels, setReels] = useState([]);
  const { loading, setLoading } = useLoadingContext();
  // const [page, setPage] = useState(0);
  // const [isHasMorePost, setIsHasMorePost] = useState(true);

  useEffect(() => {
    getReels();
  }, []);

  const getReels = async (page = 0) => {
    setLoading((prev) => ({ ...prev, reel: true }));
    try {
      setLoading(true);
      const res = await ax.get(`/api/v1/reels?page=${page}&size=2`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReels((prev) => [...prev, ...res.data.reels]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prev) => ({ ...prev, reel: false }));
    }
  };

  return (
    <BaseLayout>
      <div
        className={`${
          loading.createReel || loading.createPost ? "pointer-events-none" : ""
        } sm:ml-[76px] lg:ml-[240px] flex flex-col w-full justify-center items-center mt-2`}
      >
        {reels &&
          reels.map((reel, index) => (
            <video
              key={index}
              width="400"
              className="h-screen rounded-xl my-4 shadow shadow-white/20"
              autoPlay
              playsInline
              controls
              loop
            >
              <source
                src={`http://127.0.0.1:8000/storage/${reel.url_path}`}
                type="video/mp4"
              />
            </video>
          ))}
        {loading.reel && <Loading></Loading>}
      </div>
    </BaseLayout>
  );
};

export default ReelsPage;
