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
import { ProfileProvider } from "./context/ProfileContext";
import EditProfilePage from "./page/edit-profile";
import { LoadingProvider } from "./context/LoadingContext";
import MessageDetailPage from "./page/message-detail";
import SavedPage from "./page/saved";
import { SavedProvide } from "./context/SavedContext";

function App() {
  return (
    <LoadingProvider>
      {" "}
      <PostProvider>
        <ExploreProvider>
          <SavedProvide>
            <ProfileProvider>
              <BrowserRouter>
                <RouteProvider>
                  <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/show/:id" element={<ShowPage />}></Route>
                    <Route path="/explore" element={<ExplorePage />}></Route>
                    <Route path="/saved" element={<SavedPage />}></Route>
                    <Route path="/message" element={<MessagePage />}></Route>
                    <Route
                      path="/account/edit"
                      element={<EditProfilePage />}
                    ></Route>
                    <Route
                      path="/message/:username"
                      element={<MessageDetailPage />}
                    ></Route>
                    <Route path="/:username" element={<ProfilePage />}></Route>

                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/register" element={<RegisterPage />}></Route>
                  </Routes>
                </RouteProvider>
              </BrowserRouter>
            </ProfileProvider>
          </SavedProvide>
        </ExploreProvider>
      </PostProvider>
    </LoadingProvider>
  );
}

export default App;
