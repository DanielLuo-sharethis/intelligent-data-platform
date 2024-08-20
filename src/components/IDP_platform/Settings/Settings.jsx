import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Settings.css"; // Import the CSS file
import userIcon from "assets/user.png";

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
          <img src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="Header" />
        </div>
        <div className="settings-profile-image">
          <img src={userIcon} alt="Profile" />
        </div>
        <div className="settings-content">
          <h2>Org: {organization}</h2>
          <p className="profile-email">{currentUser.email}</p>
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
