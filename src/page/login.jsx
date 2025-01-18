import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen text-1 font-apple">
      <div className="lg:block hidden w-[50%] mr-10">
        <img src="images/bg-login.jpg" alt="" className="rounded-md" />
      </div>

      <div className="border w-96 h-96 p-2 border-slate-500">
        <div className="font-caveat text-5xl text-center mt-10">Verneil</div>

        <form
          action=""
          className="flex justify-center w-full items-center flex-col mt-10"
        >
          <div className="w-80 mb-2">
            <input
              type="text"
              className="w-full bg-btn outline-none px-2.5 py-1.5 rounded-sm"
              placeholder="Email"
            />
          </div>
          <div className="w-80 mb-3">
            <input
              type="password"
              className="w-full bg-btn outline-none px-2.5 py-1.5 rounded-sm"
              placeholder="Password"
            />
          </div>

          <input
            type="button"
            value="Login"
            className="w-80 bg-blue-700 px-2.5 py-1.5 rounded-sm"
          />
        </form>

        <p className="text-center text-1 mt-10">
          Don't have account ? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
