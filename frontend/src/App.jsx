import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import { AuthContext } from "./util/context/AuthContext";
import { useAuth } from "./util/hooks/useAuth";
import Home from "./components/Home/Home";
import DashBoard from "./components/DashBoard/DashBoard";
import CreateAccount from "./components/CreateAccount/CreateAccount";
// import Friends from "./components/Friends/Friends";
import Follow from "./components/Follow/Follow";
import Login from "./components/Login/Login";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import Search from "./components/Search/Search";

import "./ui/styles/main.css";
import Groups from "./containers/Groups/Groups";

function App() {
  const { user, setUser, token, signup, signin, signout } = useAuth();
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          user,
          setUser,
          token,
          signup,
          signin,
          signout,
        }}
      >
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            {token && (
              <>
                <Route path="/groups" element={<Groups />} />
                <Route path="/follow" element={<Follow />} />
              </>
            )}
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/dashboard/:username" element={<DashBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
