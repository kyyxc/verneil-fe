import React from "react";
import HomePage from "../page/home";
import ExplorePage from "../page/explore";
import SavedPage from "../page/saved";
import { matchPath } from "react-router-dom";
import ProfilePage from "../page/profile";

const BackShow = ({ prev }) => {
  if (prev == "/explore") {
    return <ExplorePage></ExplorePage>;
  } else if (prev == "/saved") {
    return <SavedPage></SavedPage>;
  } else if (matchPath("/:username", prev)) {
    return <ProfilePage></ProfilePage>;
  } else {
    return <HomePage></HomePage>;
  }

  //   {
  //     prev == "/" && <HomePage></HomePage>;
  //   }
  //   {
  //     prev == "/explore" && <ExplorePage></ExplorePage>;
  //   }
  //   {
  //     prev == "/saved" && <SavedPage></SavedPage>;
  //   }
  //   {
  //     matchPath("/:username", prev) && <ProfilePage></ProfilePage>;
  //   }
};

export default BackShow;
