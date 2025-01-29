import React, { useState } from "react";
import BaseLayout from "../components/Layout/baseLayout";
import { Link } from "react-router-dom";
import { ax } from "../api/authentication";

const EditProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    username: user.username || "",
    full_name: user.full_name || "",
    email: user.email || "",
    bio: user.bio || "",
    is_privated: user.is_privated || false,
    avatar: user.avatar || "images/avatar.svg",
  });

  const handleImagePreview = (e) => {
    const file = e.target.files[0];

    const imageUrl = URL.createObjectURL(file);
    setAvatar(file);
    setPreviewAvatar(imageUrl);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = {
      ...input,
      avatar: avatar,
      is_privated: e.target.is_privated.checked ? 1 : 0,
    };
    console.log(data);

    try {
      const res = await ax.post("api/v1/users/update", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);

      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.log(err);
      setErrors({
        ...err.response.data.errors,
        message: err.response.data.message,
      });
    }
  };

  return (
    <BaseLayout>
      <div className="sm:ml-[76px] lg:ml-[240px] flex flex-col flex-1">
        <div className="p-6 text-2xl font-semibold">Edit Profile</div>
        <form onSubmit={handleEditProfile} encType="multipart/form-data">
          <div className="px-20">
            <div className="flex justify-center">
              <div className="w-full py-4 px-5 rounded-2xl  bg-btn flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={
                      previewAvatar
                        ? previewAvatar
                        : `http://127.0.0.1:8000/storage/${input.avatar}`
                    }
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="">
                    <div className="ml-3 flex">
                      <h1 to="/" className="text-1 text-sm font-semibold">
                        {user.username}
                      </h1>
                    </div>
                    <h5 className="ml-3 text-xs text-1">{user.full_name}</h5>
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    name="file_images"
                    id="file_images"
                    className="hidden"
                    onChange={handleImagePreview}
                  />
                  <label
                    htmlFor="file_images"
                    className="w-[60%] bg-blue-600 py-2.5 px-2 rounded-md text-center hover:bg-blue-700"
                  >
                    Change Profile
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-1 mt-5">
                <div>Username</div>
                <input
                  type="text"
                  className="py-4 px-4 mt-2 outline-none w-full bg-transparent border border-1 rounded-2xl"
                  placeholder="Username"
                  name="username"
                  value={input.username}
                  onChange={(e) =>
                    setInput((prev) => ({ ...prev, username: e.target.value }))
                  }
                />
                {errors?.username && (
                  <p className="py-1 text-red-600">{errors.username}</p>
                )}
              </div>
              <div className="flex-1 mt-5">
                <div>Full_name</div>
                <input
                  type="text"
                  className="py-4 px-4 mt-2 outline-none w-full bg-transparent border border-1 rounded-2xl"
                  placeholder="Full Name"
                  name="full_name"
                  value={input.full_name}
                  onChange={(e) =>
                    setInput((prev) => ({ ...prev, full_name: e.target.value }))
                  }
                />
                {errors?.full_name && (
                  <p className="py-1 text-red-600">{errors.full_name}</p>
                )}
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-1 mt-5">
                <div>Email</div>
                <input
                  type="text"
                  className="py-4 px-4 mt-2 outline-none w-full bg-transparent border border-1 rounded-2xl"
                  placeholder="Email"
                  name="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                {errors?.email && (
                  <p className="py-1 text-red-600">{errors.email}</p>
                )}
              </div>
              <div className="flex-1 mt-5">
                <div>Is_privated</div>
                <div
                  className="py-4 px-4 mt-2 outline-none flex justify-between w-full bg-transparent border border-1 rounded-2xl"
                  placeholder="Full Name"
                >
                  <div>Is Privated</div>
                  <div>
                    <input
                      type="checkbox"
                      name="is_privated"
                      id="is_privated"
                      value={input.is_privated}
                      onChange={(e) =>
                        setInput((prev) => ({
                          ...prev,
                          is_privated: e.target.checked,
                        }))
                      }
                    />
                    {errors?.is_privated && (
                      <p className="py-1 text-red-600">{errors.is_privated}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-5">
              <div>Bio</div>
              <input
                type="text"
                className="py-5 px-4 mt-2 outline-none w-full bg-transparent border border-1 rounded-2xl"
                placeholder="Bio"
                name="bio"
                value={input.bio}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, bio: e.target.value }))
                }
              />
              {errors?.bio && <p className="py-1 text-red-600">{errors.bio}</p>}
            </div>
            <div className="w-full mt-5 flex justify-end">
              <input
                type="submit"
                value="Submit"
                className="w-[20%] bg-blue-600 py-2.5 px-2 rounded-md text-center hover:bg-blue-700"
              />
            </div>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default EditProfilePage;
