
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./page/home";
import ProfilePage from "./page/profile";
import RegisterPage from "./page/register";
import LoginPage from "./page/login";
import ShowPage from "./page/show";
import ExplorePage from "./page/explore";
import { PostProvider } from "./context/PostProvide";

function App() {
  return (
    <PostProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/show/:id" element={<ShowPage />}></Route>
        <Route path="/explore" element={<ExplorePage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>

        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </BrowserRouter>
    </PostProvider>
  );
}

export default App;
