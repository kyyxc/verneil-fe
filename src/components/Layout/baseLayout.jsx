import { useEffect } from "react";
import PrivateRoute from "../Fragments/PrivateLayout";
import NavigationBar from "../navigatioBar";

export default function BaseLayout({ children }) {
  return (
    <PrivateRoute>
      <div className="p-0 m-0 flex flex-col sm:flex-row font-apple h-screen overflow-x-hidden w-screen bg-black text-slate-100">
        <NavigationBar></NavigationBar>
        {children}
      </div>
    </PrivateRoute>
  );
}
