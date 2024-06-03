import { createContext, useState, useContext } from "react";
import api from "@/config/api";
import { jwtDecode } from "jwt-decode";
import { notification } from "antd";

const AuthContext = createContext({});

interface LoginState {
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [error, setError] = useState<unknown>(null);

  const login = async (credentials: LoginState) => {
    try {
      const response = await api("/auth/signin", "POST", credentials);
      const tokenData = jwtDecode(response.data.token) as {
        userId: string;
      };

      setToken(response.data.token);
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userId", tokenData?.userId);

      notification.success({
        message: "Success",
        description: "Logged in successfully!",
      });

      return response;
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: `${
          error?.message || "Something went wrong, please try again!"
        }`,
      });
    }
  };

  const register = async (credentials: LoginState) => {
    try {
      const response = await api("/auth/register", "POST", credentials);

      setToken(response.data.token);
      localStorage.setItem("authToken", response.data.token);
    } catch (err) {
      setError(err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, error, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
