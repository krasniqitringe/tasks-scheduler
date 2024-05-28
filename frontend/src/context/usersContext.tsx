import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/baseURL";

const UserContext = createContext({});

interface UserState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  profileImage: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users`);
        setUser(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const createUser = async (user: UserState) => {
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/users/`, user);
      setUser(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, user: UserState) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${BASE_URL}/users/${id}`, user);
      setUser(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BASE_URL}/users/${id}`);
      setUser(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/users/${id}`);
      setUser(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        createUser,
        updateUser,
        deleteUser,
        fetchUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return React.useContext(UserContext);
};
