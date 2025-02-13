import { ax } from "../api/authentication";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") || localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    try {
      const res = await ax.post("api/v1/auth/signin", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setErrors({
        ...err.response.data.errors,
        message: err.response.data.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-1 font-apple">
      {/* <div className="lg:block hidden w-[50%] mr-10">
        <img src="images/bg-login.jpg" alt="" className="rounded-md" />
      </div> */}

      <div className="border w-96 h-96 p-2 border-btn">
        <div className="font-caveat text-5xl text-center mt-10">Verneil</div>

        <form
          onSubmit={handleLogin}
          className="flex justify-center w-full items-center flex-col mt-10"
        >
          <div className="w-80 mb-2">
            <input
              type="text"
              className="w-full bg-btn outline-none px-2.5 py-1.5 rounded-sm"
              placeholder="Email"
              name="email"
            />
            {errors?.email && (
              <p className="text-red-400 mt-1.5 italic text-sm">
                {errors.email}
              </p>
            )}
          </div>
          <div className="w-80 mb-3">
            <input
              type="password"
              className="w-full bg-btn outline-none px-2.5 py-1.5 rounded-sm"
              placeholder="Password"
              name="password"
              id="password"
            />
            {errors?.password && (
              <p className="text-red-400 mt-1.5 italic text-sm">
                {errors.password}
              </p>
            )}
            {errors?.message && (
              <p className="text-red-400 mt-1.5 italic text-sm">
                {errors.message}
              </p>
            )}
          </div>
          <input
            type="submit"
            value="Login"
            className="w-80 bg-blue-700 px-2.5 py-1.5 rounded-sm"
          />
        </form>

        <p className="text-center text-1 mt-10">
          Don't have account ?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
