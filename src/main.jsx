import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import HomePage from "./page/home";
import ProfilePage from "./page/profile";
import RegisterPage from "./page/register";
import LoginPage from "./page/login";
import ShowPage from "./page/show";
import ExplorePage from "./page/explore";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/show" element={<ShowPage />}></Route>
        <Route path="/explore" element={<ExplorePage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>

        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
