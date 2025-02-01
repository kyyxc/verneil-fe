import { Link, matchPath, useNavigate, useParams } from "react-router-dom";
import HomePage from "./home";
import { useEffect, useState } from "react";
import { ax } from "../api/authentication";
import { usePostContext } from "../context/PostProvide";
import { LikePost } from "../api/post";
import PostDetail from "../components/PostDetail";
import ExplorePage from "./explore";
import { useRouteContext } from "../context/RouteContext";
import ProfilePage from "./profile";

export default function ShowPage() {
  const {
    setPosts,
    isOpenMenu,
    setIsOpenMenu,
    deleteCommentId,
    setDeleteCommentId,
  } = usePostContext();
  const { id } = useParams();
  const [post, setPost] = useState();
  const { prevLocation } = useRouteContext();
  const [prev, setPrev] = useState("/");
  const navigate = useNavigate();

  useEffect(() => {
    getPost();
    setPrev(prevLocation?.pathname || "/");
  }, [id]);

  useEffect(() => {
    console.log(prev);
  }, [prev]);

  const getPost = async () => {
    try {
      const res = await ax.get(`api/v1/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPost(res.data.post);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = (id) => {
    LikePost(id, setPosts, setPost);
  };

  const handleDeletePost = async (id) => {
    try {
      const res = await ax.delete(`api/v1/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts((prev) => prev.filter((post) => post.id !== id));
      navigate("/");
    } catch (err) {
      console.log(err);
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
      {prev && (
        <>
          <div className="opacity-30 pointer-events-none">
            {prev == "/" && <HomePage></HomePage>}
            {prev == "/explore" && <ExplorePage></ExplorePage>}
            {matchPath("/:username", prev) && <ProfilePage></ProfilePage>}
          </div>

          <Link
            to={prev}
            className={`${isOpenMenu ? "opacity-70 pointer-events-none" : ""}`}
          >
            <i className="bi bi-x text-1 fixed top-0 right-6 text-[42px] z-50"></i>
          </Link>
          {post && (
            <PostDetail
              post={post}
              setPost={setPost}
              handleLike={handleLike}
              handleDeletePost={handleDeletePost}
              isOpenMenu={isOpenMenu}
              setIsOpenMenu={setIsOpenMenu}
              deleteCommentId={deleteCommentId}
              setDeleteCommentId={setDeleteCommentId}
            />
          )}
        </>
      )}
    </>
  );
}
