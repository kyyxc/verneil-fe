import axios from "axios";

export const ax = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    Accept: "application/json",
  },
});

export const LoginService = async (data, closure) => {
  try {
    const res = await ax.post("/auth/signin", data);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const Logout = async (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  try {
    const res = await ax.delete(
      "api/v1/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }

  navigate("/login");
};
