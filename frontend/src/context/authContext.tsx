import { createContext, useState, useContext } from "react";
import api from "@/config/api";
import { JwtPayload, jwtDecode } from "jwt-decode";

const AuthContext = createContext({});

interface LoginState {
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<unknown>(null);

  const login = async (credentials: LoginState) => {
    try {
      const response = await api("/auth/signin", "POST", credentials);
      const tokenData = jwtDecode(response.data.token) as JwtPayload;

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userId", tokenData?.userId);
    } catch (err) {
      setError(err);
    }
  };

  const register = async (credentials: LoginState) => {
    try {
      const response = await api("/auth/register", "POST", credentials);

      localStorage.setItem("authToken", response.data.token);
    } catch (err) {
      setError(err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
