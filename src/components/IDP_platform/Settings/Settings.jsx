import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Settings.css"; // Import the CSS file
import userIcon from "assets/user.png";
import computerIcon from "assets/Auth/computer.png";


export default function Settings() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [organization, setOrganization] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const organization = currentUser.displayName;
    setOrganization(organization);
  }, [currentUser]);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="settings-container">
      <div className="settings-card">
        <div className="settings-header-image">
          <img src={computerIcon} alt="Header" />
        </div>
        <div className="settings-profile-image">
          <img src={userIcon} alt="Profile" />
        </div>
        <div className="settings-content">
          <h3>Org: {organization}</h3>
          <h3> {currentUser.email}</h3>
          {/* <p className="profile-email">{currentUser.email}</p> */}
          <p className="profile-description">
           
          </p>
        </div>
        <hr />
        <div className="settings-footer">
          <Button className="log-out-button" variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
