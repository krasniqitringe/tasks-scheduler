import { createContext, useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/baseURL";

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
      const response = await axios.post(`${BASE_URL}/auth/signin`, credentials);
      setUser(response.data.user);
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
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
