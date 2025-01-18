import { Link } from "react-router-dom";

export default function RegisterPage(){
    return(
        <div className="flex items-center justify-center h-screen text-1 font-apple">
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
              value="Register"
              className="w-80 bg-blue-700 px-2.5 py-1.5 rounded-sm"
            />
          </form>
  
          <p className="text-center text-1 mt-10">
            have account ? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    )
}