import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { notification } from "antd";

// Pages
import NotFound from "@/components/NotFound";

// Dashboard Childrens
import Dashboard from "@/containers/dashboard";
import Login from "@/containers/authentication/Login";
import Register from "@/containers/authentication/Register";

// State

const Navigation: React.FC = () => {
  const [, contextHolder] = notification.useNotification();
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <>
      {contextHolder}
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default Navigation;
