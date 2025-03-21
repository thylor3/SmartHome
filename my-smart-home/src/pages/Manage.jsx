import React, { useState, useEffect } from "react";
import { 
  FaHome, FaUsers, FaClock, FaSignOutAlt, FaFan, FaLightbulb, 
  FaTemperatureHigh, FaTint, FaSun, FaUser 
} from "react-icons/fa";
import "./Manage.css";

const Manage = ({ setIsLoggedIn, username = "Admin" }) => {
  const [selectedPage, setSelectedPage] = useState("Thông tin tài khoản");

  const [devices, setDevices] = useState({
    fan1: false,
    fan2: false,
    light1: false,
    light2: false
  });

  const [sensors, setSensors] = useState({
    temperature: 25,
    humidity: 60,
    light: 300
  });

  const [userInfo, setUserInfo] = useState({
    fullName: username,
    username: username,
    email: "",
    phone: "",
    address: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors({
        temperature: (20 + Math.random() * 10).toFixed(1),
        humidity: (50 + Math.random() * 20).toFixed(1),
        light: (200 + Math.random() * 100).toFixed(0)
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleDevice = (device) => {
    setDevices((prev) => ({ ...prev, [device]: !prev[device] }));
  };

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="manage-container">
      {/* 🚀 Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <FaUser size={40} />
          <span>{userInfo.fullName}</span>
        </div>

        <ul className="menu">
          {[
            { key: "Thông tin tài khoản", name: "Thông tin tài khoản", icon: <FaHome /> },
            { key: "Quản lý thiết bị", name: "Quản lý thiết bị", icon: <FaUsers /> },
            { key: "Lịch biểu", name: "Lên lịch biểu", icon: <FaClock /> }
          ].map((item) => (
            <li 
              key={item.key} 
              className={selectedPage === item.key ? "active" : ""}
              onClick={() => setSelectedPage(item.key)}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <span>{userInfo.fullName}</span>
          <p>Admin</p>
          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
            <FaSignOutAlt /> Đăng xuất
          </button>
        </div>
      </div>

      {/* 📌 Nội dung chính */}
      <div className="main-content">
        {selectedPage === "Thông tin tài khoản" && (
          <div className="account-info">
            <h2>Thông Tin Tài Khoản</h2>
            {!isEditing ? (
              <div className="info-view">
                <p><strong>Họ và Tên:</strong> {userInfo.fullName}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Số điện thoại:</strong> {userInfo.phone}</p>
                <p><strong>Địa chỉ:</strong> {userInfo.address}</p>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>✏️ Chỉnh sửa</button>
              </div>
            ) : (
              <form>
                <label>Họ và Tên:</label>
                <input type="text" name="fullName" value={userInfo.fullName} onChange={handleInputChange} />
                
                <label>Email:</label>
                <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
                
                <label>Điện thoại:</label>
                <input type="text" name="phone" value={userInfo.phone} onChange={handleInputChange} />
                
                <label>Địa chỉ:</label>
                <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} />
                
                <button type="button" onClick={handleSave} className="save-btn">💾 Lưu</button>
              </form>
            )}
          </div>
        )}

        {/* Quản lý thiết bị */}
        {selectedPage === "Quản lý thiết bị" && (
          <div className="device-container">
          {/* 📌 QUẢN LÝ THIẾT BỊ */}
          <div className="device-grid">
              {[
                  { key: "fan1", name: "Quạt 1", icon: <FaFan /> },
                  { key: "fan2", name: "Quạt 2", icon: <FaFan /> },
                  { key: "light1", name: "Đèn 1", icon: <FaLightbulb /> },
                  { key: "light2", name: "Đèn 2", icon: <FaLightbulb /> }
              ].map((device) => (
                  <div 
                      key={device.key} 
                      className={`device-card ${devices[device.key] ? "on" : "off"}`}
                      onClick={() => toggleDevice(device.key)}
                  >
                      <span className="device-icon">{device.icon}</span>
                      <p>{device.name}</p>
                      <button className="toggle-btn">
                          {devices[device.key] ? "TẮT" : "BẬT"}
                      </button>
                  </div>
              ))}
          </div>
      
          {/* ✅ CẢM BIẾN - NẰM NGAY DƯỚI */}
          <div className="sensor-grid">
              {[
                  { key: "temperature", name: "Nhiệt Độ", icon: <FaTemperatureHigh />, unit: "°C" },
                  { key: "humidity", name: "Độ Ẩm", icon: <FaTint />, unit: "%" },
                  { key: "light", name: "Ánh Sáng", icon: <FaSun />, unit: "lux" }
              ].map((sensor) => (
                  <div key={sensor.key} className="sensor-card">
                      <span className="sensor-icon">{sensor.icon}</span>
                      <p>{sensor.name}: <strong>{sensors[sensor.key]} {sensor.unit}</strong></p>
                  </div>
              ))}
          </div>
      </div>
        )}
      </div>
    </div>
  );
};

export default Manage;