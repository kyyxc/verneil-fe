import React from "react";
import { ax } from "../api/authentication";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { userProfileProvider } from "../context/ProfileContext";

const StatusFollowing = ({ user, setUser }) => {
  const { setIsOpenSettings } = userProfileProvider();
  const handleFollow = async () => {
    try {
      const res = await ax.post(
        `api/v1/users/${user.username}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser((prev) => ({
        ...prev,
        following_status: prev.is_privated ? "requested" : "following",
        followers_count: prev.is_privated
          ? prev.followers_count
          : (prev.followers_count += 1),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      const res = await ax.delete(`api/v1/users/${user.username}/unfollow`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser((prev) => ({
        ...prev,
        following_status: "not-following",
        followers_count:
          prev.following_status == "requested"
            ? prev.followers_count
            : (prev.followers_count -= 1),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  if (user.is_your_account) {
    return (
      <div className="flex gap-5 sm:ml-8 items-center ">
        <Link to="/account/edit">
          <input
            type="button"
            value="Edit Profile"
            className="bg-btn px-4 py-1 rounded-md"
          />
        </Link>
        <Link to='/saved'>
          <input
            type="button"
            value="Saved"
            className="bg-btn px-4 py-1 rounded-md"
          />
        </Link>
        <Settings onClick={() => setIsOpenSettings(true)} />
      </div>
    );
  } else if (user.following_status == "requested") {
    return (
      <div className="flex gap-5 sm:ml-8">
        <input
          type="button"
          value="Requested"
          className="bg-btn px-4 py-1 rounded-md"
          onClick={handleUnfollow}
        />
      </div>
    );
  } else if (user.following_status == "not-following") {
    return (
      <div className="flex gap-5 sm:ml-8">
        <input
          type="button"
          value="Follow"
          className="bg-blue-600 px-4 py-1 rounded-md"
          onClick={handleFollow}
        />
      </div>
    );
  } else if (user.following_status == "following") {
    return (
      <div className="flex gap-5 sm:ml-8">
        <input
          type="button"
          value="Unfollow"
          className="bg-btn px-4 py-1 rounded-md"
          onClick={handleUnfollow}
        />
        <Link to={`/message/${user.username}`}>
          <input
            type="button"
            value="Message"
            className="bg-btn px-4 py-1 rounded-md"
          />
        </Link>
      </div>
    );
  }
};

export default StatusFollowing;
