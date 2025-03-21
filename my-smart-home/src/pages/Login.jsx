import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setUsername }) => {
  const navigate = useNavigate();
  const [username, setUsernameState] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      alert("Vui lòng nhập tên đăng nhập!");
      return;
    }

    localStorage.setItem("username", username);  
    setUsername(username);
    alert(`Xin chào, ${username}!`);
    navigate("/manage");
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Đăng Nhập</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsernameState(e.target.value)}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="login-btn">Đăng nhập</button>
            <span className="back-text" onClick={() => navigate("/")}>
              ⬅ Quay lại
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;