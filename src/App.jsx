import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./page/home";
import ProfilePage from "./page/profile";
import RegisterPage from "./page/register";
import LoginPage from "./page/login";
import ShowPage from "./page/show";
import ExplorePage from "./page/explore";
import { PostProvider } from "./context/PostProvide";
import MessagePage from "./page/message";
import { ExploreProvider } from "./context/ExploreContext";
import { RouteProvider } from "./context/RouteContext";

function App() {
  return (
    <PostProvider>
      <ExploreProvider>
        <BrowserRouter>
          <RouteProvider>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/show/:id" element={<ShowPage />}></Route>
              <Route path="/explore" element={<ExplorePage />}></Route>
              <Route path="/:username" element={<ProfilePage />}></Route>
              <Route path="/message" element={<MessagePage />}></Route>

              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
            </Routes>
          </RouteProvider>
        </BrowserRouter>
      </ExploreProvider>
    </PostProvider>
  );
}

export default App;
