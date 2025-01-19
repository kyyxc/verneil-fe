import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/Fragments/Input";
import { useState } from "react";
import { ax } from "../api/authentication";
import ErrorForm from "../components/Fragments/ErrorForm";

export default function RegisterPage() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = {
      email: e.currentTarget.email.value,
      username: e.currentTarget.username.value,
      full_name: e.currentTarget.full_name.value,
      password: e.currentTarget.password.value,
    };

    try {
      const res = await ax.post("/api/v1/auth/signup", data);

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
      <div className="border w-96 p-2 border-slate-500">
        <div className="font-caveat text-5xl text-center mt-10">Verneil</div>

        <form
          onSubmit={handleRegister}
          className="flex justify-center w-full items-center flex-col mt-10"
        >
          <div className="text-center">
            <InputForm type="email" name="email" placeholder="Email" />
            {errors?.email && <ErrorForm err={errors.email}></ErrorForm>}
          </div>

          <div className="text-center">
            <InputForm type="username" name="username" placeholder="Username" />
            {errors?.username && <ErrorForm err={errors.username}></ErrorForm>}
          </div>
          <div className="text-center">
            <InputForm
              type="full_name"
              name="full_name"
              placeholder="Full Name"
            />
            {errors?.full_name && (
              <ErrorForm err={errors.full_name}></ErrorForm>
            )}
          </div>
          <div className="text-center">
            <InputForm type="password" name="password" placeholder="********" />
            {errors?.password && <ErrorForm err={errors.password}></ErrorForm>}
            {errors?.message && <ErrorForm err={errors.message}></ErrorForm>}
          </div>

          <input
            type="submit"
            value="Register"
            className="w-80 bg-blue-700 px-2.5 mt-2 py-1.5 rounded-sm"
          />
        </form>

        <p className="text-center text-1 mt-10">
          have account ?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
