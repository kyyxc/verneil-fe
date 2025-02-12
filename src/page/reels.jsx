import React, { useEffect, useRef, useState } from "react";
import BaseLayout from "../components/Layout/baseLayout";
import videoFile from "../../public/videos/video4.mp4";
import { ax } from "../api/authentication";
import Loading from "../components/Loading";

const ReelsPage = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isHasMorePost, setIsHasMorePost] = useState(true);

  useEffect(() => {
    getReels();
  }, []);

  useEffect(() => {
    console.log(reels);
  }, [reels]);

  const getReels = async (page = 0) => {
    try {
      setLoading(true);
      const res = await ax.get(`/api/v1/reels?page=${page}&size=2`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.reels);
      setReels((prev) => [...prev, ...res.data.reels]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout>
      <div className="sm:ml-[76px] lg:ml-[240px] flex flex-col w-full justify-center items-center mt-2">
        {reels &&
          reels.map((reel) => (
            <video
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
        {loading && <Loading></Loading>}
      </div>
    </BaseLayout>
  );
};

export default ReelsPage;
