import { Link, useParams } from "react-router-dom";
import HomePage from "./home";
import { useEffect, useState } from "react";
import { ax } from "../api/authentication";
import { usePostContext } from "../context/PostProvide";
import { LikePost } from "../api/post";
import PostDetail from "../components/PostDetail";

export default function ShowPage() {
  const { setPosts } = usePostContext();
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    getPost();
  }, [id]);

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

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div>
      <HomePage></HomePage>

      <Link to="/">
        <i className="bi bi-x text-1 fixed top-0 right-6 text-[42px] z-50"></i>
      </Link>
      {post && <PostDetail post={post} handleLike={handleLike} />}
    </div>
  );
}
