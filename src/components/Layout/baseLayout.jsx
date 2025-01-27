import { useEffect } from "react";
import PrivateRoute from "../Fragments/PrivateLayout";
import NavigationBar from "../navigatioBar";

export default function BaseLayout({ children }) {
  return (
    <PrivateRoute>
      <div className="flex flex-col sm:flex-row font-apple h-screen w-screen bg-black text-slate-100">
        <NavigationBar></NavigationBar>
        {children}
      </div>
    </PrivateRoute>
  );
}
