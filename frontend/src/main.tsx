import React from "react";
import ReactDOM from "react-dom/client";
// Styles
import "@/assets/sass/main.scss";
// Component
import Navigation from "./navigation/index.tsx";
// Context
import { ThemeProvider } from "@/context/themeContext.tsx";
import { TaskProvider } from "@/context/taskContext.tsx";
import { UserProvider } from "@/context/usersContext.tsx";
import { AuthProvider } from "./context/authContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <TaskProvider>
          <UserProvider>
            <Navigation />
          </UserProvider>
        </TaskProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
