import { ax } from "./authentication";

export const LikePost = async (id, setPosts, setPost = null) => {
  try {
    const res = await ax.post(
      `/api/v1/posts/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const isLiked = res.data.status == "like";
    const likeCount = isLiked ? 1 : -1;

    setPosts((prev) =>
      prev.map((post) =>
        post.id == id
          ? {
              ...post,
              is_liked: isLiked,
              likes_count: post.likes_count + likeCount,
            }
          : post
      )
    );

    if (setPost) {
      setPost((prev) => ({
        ...prev,
        is_liked: isLiked,
        likes_count: prev.likes_count + likeCount,
      }));
    }
  } catch (err) {
    console.log(err);
  }
};

export const SavePost = async (id, setPosts, setPost = null) => {
  try {
    const res = await ax.post(
      `/api/v1/posts/${id}/save`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const is_save = res.data.status == "Saved";

    setPosts((prev) =>
      prev.map((post) => (post.id == id ? { ...post, is_save: is_save } : post))
    );

    if (setPost) {
      setPost((prev) => ({ ...prev, is_save: is_save }));
    }
  } catch (err) {
    console.log(err);
  }
};
