import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import UserItemScroller from "./components/mainLayout/UserItemScroller";
import StatusItemScroller from "./components/mainLayout/StatusItemScroller";
import useUserInfo from "./components/userInfo/UserHook";
import { FolloweePresenter } from "./presenters/FolloweePresenter";
import { UserItemView } from "./presenters/UserItemPresenter";
import { FollowerPresenter } from "./presenters/FollowerPresenter";
import { StoryPresenter } from "./presenters/StoryPresenter";
import { StatusItemView } from "./presenters/StatusItemPresenter";
import { FeedPresenter } from "./presenters/FeedPresenter";
import ItemScroller from "./components/mainLayout/ItemScroller";
import { Status, User } from "tweeter-shared";
import { StatusService } from "./model/service/StatusService";
import StatusItem from "./components/statusItem/StatusItem";
import { UserService } from "./model/service/UserService";
import UserItem from "./components/userItem/UserItem";
import { FollowService } from "./model/service/FollowService";

const App = () => {
  const { currentUser, authToken } = useUserInfo();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route
          path="feed"
          element={
            // <StatusItemScroller
            //   key={1}
            //   presenterGenerator={(view: StatusItemView) =>
            //     new FeedPresenter(view)
            //   }
            // />
            <ItemScroller<Status, StatusService>
              key={"feed"}
              presenterGenerator={(view: StatusItemView) =>
                new FeedPresenter(view)
              }
              itemComponentGenerator={(Status) => (
                <StatusItem status={Status} />
              )}
            />
          }
        />
        <Route
          path="story"
          element={
            // <StatusItemScroller
            //   key={2}
            //   presenterGenerator={(view: StatusItemView) =>
            //     new StoryPresenter(view)
            //   }
            // />
            <ItemScroller<Status, StatusService>
              key={"story"}
              presenterGenerator={(view: StatusItemView) =>
                new StoryPresenter(view)
              }
              itemComponentGenerator={(Status) => (
                <StatusItem status={Status} />
              )}
            />
          }
        />
        <Route
          path="followees"
          element={
            // <UserItemScroller
            //   key={1}
            //   presenterGenerator={(view: UserItemView) =>
            //     new FolloweePresenter(view)
            //   }
            // />
            <ItemScroller<User, FollowService>
              key={"folowees"}
              presenterGenerator={(view: UserItemView) =>
                new FolloweePresenter(view)
              }
              itemComponentGenerator={(User) => <UserItem value={User} />}
            />
          }
        />
        <Route
          path="followers"
          element={
            // <UserItemScroller
            //   key={2}
            //   presenterGenerator={(view: UserItemView) =>
            //     new FollowerPresenter(view)
            //   }
            // />
            <ItemScroller<User, FollowService>
              key={"followers"}
              presenterGenerator={(view: UserItemView) =>
                new FollowerPresenter(view)
              }
              itemComponentGenerator={(User) => <UserItem value={User} />}
            />
          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
