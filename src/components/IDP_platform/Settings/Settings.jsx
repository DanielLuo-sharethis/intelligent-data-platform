import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Settings.css"; // Import the CSS file

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
    <div className="profile-container">
      <h2 className="profile-title text-center">Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="profile-details">
        <p><strong>Organization: </strong>{organization}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
      </div>
      <Button className="log-out-button" variant="link" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
}
