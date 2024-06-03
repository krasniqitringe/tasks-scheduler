import React, { createContext, useState } from "react";
import api from "@/config/api";
import { notification } from "antd";

const UserContext = createContext({});

export interface UserState {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  profileImage: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserProvider = ({ children }: any) => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchUsers = async () => {
    try {
      const response = await api("/users", "GET");

      setUsers(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (user: UserState) => {
    setLoading(true);

    try {
      await api("/users", "POST", user);
      await fetchUsers();

      notification.success({
        message: "Success",
        description: "User created successfully!",
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, user: UserState) => {
    setLoading(true);
    try {
      await api(`/users/${id}`, "PATCH", user);
      await fetchUsers();

      notification.success({
        message: "Success",
        description: "User updated successfully!",
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      await api(`/users/${id}`, "DELETE");
      await fetchUsers();

      notification.success({
        message: "Success",
        description: "User deleted successfully!",
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id: string) => {
    setLoading(true);
    try {
      const response = await api(`/users/${id}`, "GET");
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
        users,
        loading,
        error,
        fetchUsers,
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
