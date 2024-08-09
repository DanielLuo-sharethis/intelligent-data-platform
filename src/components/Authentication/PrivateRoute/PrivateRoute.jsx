import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

export default function PrivateRoute({ element: Element }) {
  const { currentUser } = useAuth();

  return currentUser ? <Element /> : <Navigate to="/login" />;
}
