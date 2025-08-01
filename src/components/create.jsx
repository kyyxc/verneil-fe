import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ax } from "../api/authentication";
import Loading from "./Loading";
import { useLoadingContext } from "../context/LoadingContext";

const Create = ({ setCreateStatus }) => {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [previewImage, setPreviewImage] = useState();
  const [previewVideo, setPreviewVideo] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const { loading, setLoading } = useLoadingContext();

  const handleNextSlider = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevSlider = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleSelectedImage = (e) => {
    const files = e.target.files;
    if (files[0].type == "video/mp4") {
      setVideo(files[0]);

      console.log("preview Video");
      const videoUrl = URL.createObjectURL(files[0]);
      setPreviewVideo(videoUrl);
    } else {
      setImages(files);
      console.log("preview image");
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImage(imageUrls);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const data = {
      caption: e.target.caption.value,
      media: images,
    };

    try {
      setLoading((prev) => ({ ...prev, createPost: true }));
      await ax.post("/api/v1/posts", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setCreateStatus(false);
      setPreviewImage([]);
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prev) => ({ ...prev, createPost: false }));
    }
  };

  const handlePostReel = async (e) => {
    e.preventDefault();

    const data = {
      caption: e.target.caption.value,
      video: video,
      duration: 60,
    };

    try {
      setLoading((prev) => ({ ...prev, createReel: true }));
      await ax.post("/api/v1/reels", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setCreateStatus(false);
      setPreviewVideo(null);
      navigate("/reels");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prev) => ({ ...prev, createReel: false }));
    }
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <>
      <Link onClick={() => setCreateStatus(false)}>
        <i className="bi bi-x text-1 fixed top-0 right-6 text-[42px] z-50"></i>
      </Link>

      {!previewImage && (
        <div className="fixed z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-80 h-96 bg-btn">
          <div className="flex flex-col h-full">
            <div className="h-10 w-full flex items-center justify-center bg-black font-xl font-semibold text-center rounded-t-lg">
              Create Post
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
              <i className="bi bi-image text-8xl mb-10"></i>
              <form encType="multipart/form-data">
                <input
                  type="file"
                  name="file_images"
                  id="file_images"
                  className="hidden"
                  multiple
                  onChange={handleSelectedImage}
                />
                <label
                  htmlFor="file_images"
                  className="w-[60%] bg-blue-600 py-1.5 px-2 rounded-md text-center hover:bg-blue-700"
                >
                  Select from image
                </label>
              </form>
            </div>
          </div>
        </div>
      )}

      {previewImage && (
        <>
          <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl w-[400px] h-[300px] sm:w-[80%] sm:h-[40%] md:w-[800px] md:h-[500px] ">
            <div className="h-10 w-full flex items-center justify-center bg-black font-xl font-semibold text-center rounded-t-lg">
              Create Post
            </div>
            <div className="flex h-full">
              <div className="w-[60%] relative">
                {currentIndex > 0 && (
                  <i
                    className="bi bi-caret-left-fill absolute top-1/2 left-2 text-3xl translate-y-1/2"
                    onClick={handlePrevSlider}
                  ></i>
                )}
                <img
                  src={previewImage[currentIndex]}
                  alt=""
                  className="object-cover w-full h-full"
                />
                {currentIndex + 1 < previewImage.length && (
                  <i
                    className="bi bi-caret-right-fill absolute top-1/2 text-3xl right-2 translate-y-1/2"
                    onClick={handleNextSlider}
                  ></i>
                )}
              </div>
              <div className="flex-1 bg-btn p-4 h-full">
                <div className="flex items-center">
                  <img
                    src={`http://localhost:8000/storage/${user.avatar}`}
                    alt="Profile"
                    className="w-[26px] h-[26px] rounded-full lg:ml-1.5"
                  />
                  <h3 className="ml-3 text-sm font-semibold">
                    {user.username}
                  </h3>
                </div>
                <form onSubmit={handleCreatePost} className="w-full">
                  <textArea
                    name="caption"
                    className="w-full mt-4 h-40 overflow-y-auto overflow-x-hidden outline-none bg-btn text-1 placeholder:text-1 resize-none"
                  ></textArea>
                  <button className="text-end flex justify-end w-full sm:p-5 text-blue-600">
                    <p>Submit</p>
                  </button>
                </form>
              </div>
            </div>
          </div>
          {loading.createPost && (
            <div className="absolute top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Loading></Loading>
            </div>
          )}
        </>
      )}

      {previewVideo && (
        <>
          <div
            className={`${
              loading.createReel ? "pointer-events-none" : ""
            } fixed z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl w-[400px] h-[300px] sm:w-[80%] sm:h-[40%] md:w-[800px] md:h-[500px]`}
          >
            <div className="h-10 w-full flex items-center justify-center bg-black font-xl font-semibold text-center rounded-t-lg">
              Create Post
            </div>
            <div className="flex h-full">
              <div className="w-[60%] relative">
                <video
                  src={previewVideo}
                  alt=""
                  className="object-cover w-full h-full"
                  controls
                />
              </div>
              <div className="flex-1 bg-btn p-4 h-full">
                <div className="flex items-center">
                  <img
                    src={`http://localhost:8000/storage/${user.avatar}`}
                    alt="Profile"
                    className="w-[26px] h-[26px] rounded-full lg:ml-1.5"
                  />
                  <h3 className="ml-3 text-sm font-semibold">
                    {user.username}
                  </h3>
                </div>
                <form onSubmit={handlePostReel} className="w-full h-full">
                  <textarea
                    name="caption"
                    className="w-full h-[70%] lg:h-[80%] sm:h-[60%] mt-4 overflow-y-auto overflow-x-hidden outline-none bg-btn text-1 placeholder:text-1 resize-none"
                  />
                  <button
                    type="submit"
                    className="text-end flex justify-end w-full sm:p-5 text-blue-600"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          {loading.createReel && (
            <div className="absolute top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Loading></Loading>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Create;
