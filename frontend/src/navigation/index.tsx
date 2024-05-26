import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { notification } from "antd";

// Pages
import NotFound from "@/components/NotFound";

// Dashboard Childrens
import Dashboard from "@/containers/dashboard";

// State

const Navigation: React.FC = () => {
  const [, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/*" element={<Dashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default Navigation;
