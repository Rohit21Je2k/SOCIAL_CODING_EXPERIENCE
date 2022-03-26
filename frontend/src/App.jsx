import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import DashBoard from "./components/DashBoard/DashBoard";

import "./ui/styles/main.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
