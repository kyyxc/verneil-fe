import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthentication =
    localStorage.getItem("token") && localStorage.getItem("user");

  if (!isAuthentication) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
}
