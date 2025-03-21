import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaHome, FaUsers, FaLightbulb, FaTemperatureHigh, FaTint,
  FaUser, FaLock, FaWifi, FaPlug
} from "react-icons/fa";
import "./Home.css";
<button className="login-btn" onClick={() => navigate("/login")}>
Đăng nhập
</button>

const Home = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  

  // ✅ Trạng thái bật/tắt thiết bị
  const [devices, setDevices] = useState({
    light1: true, 
    wifi: true,
    airPurifier: true,
    doorLock: false
  });

  // ✅ Cảm biến
  const [sensors, setSensors] = useState({
    temperature: 26.7,
    humidity: 44.4
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors({
        temperature: (22 + Math.random() * 10).toFixed(1),
        humidity: (40 + Math.random() * 20).toFixed(1)
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <FaUser size={40} />
          <span>Người Dùng</span>
        </div>
        <ul className="menu">
          <li className="active"><FaHome /> Smart Home</li>
          <li onClick={() => navigate("/manage")}><FaUsers /> Quản lý thiết bị</li>
        </ul>
      </div>

      {/* Nội dung chính */}
      <div className="main-content">
        <h1>🏡 Smart Home</h1>
        
        {/* ✅ Cảm biến */}
        <div className="sensor-container">
          <div className="sensor-card temperature">
            <FaTemperatureHigh className="icon" />
            <h3>Nhiệt độ</h3>
            <p>{sensors.temperature}°C</p>
          </div>
          <div className="sensor-card humidity">
            <FaTint className="icon" />
            <h3>Độ ẩm</h3>
            <p>{sensors.humidity}%</p>
          </div>
        </div>

        {/* ✅ Trạng thái thiết bị */}
        <div className="device-container">
          {[
            { key: "light1", name: "Đèn", icon: <FaLightbulb />, status: devices.light1 },
            { key: "wifi", name: "Wi-Fi", icon: <FaWifi />, status: devices.wifi },
            { key: "airPurifier", name: "Lọc không khí", icon: <FaPlug />, status: devices.airPurifier },
            { key: "doorLock", name: "Cửa", icon: <FaLock />, status: devices.doorLock }
          ].map((device) => (
            <div key={device.key} className={`device-card ${device.status ? "on" : "off"}`}>
              <span className="device-icon">{device.icon}</span>
              <p>{device.name}: <strong>{device.status ? "ON" : "OFF"}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;