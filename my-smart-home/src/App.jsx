import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Manage from "./pages/Manage";
import Home from "./pages/Home";

const App = () => {
  // ✅ Quản lý trạng thái đăng nhập
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!username);  // Chuyển hướng nếu chưa đăng nhập

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
    }
  }, [username]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        
        {/* ✅ Nếu chưa đăng nhập, điều hướng về Login */}
        <Route path="/manage" element={isLoggedIn ? <Manage username={username} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;